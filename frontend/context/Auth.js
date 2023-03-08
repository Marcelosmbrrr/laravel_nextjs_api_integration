

import * as React from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Router from 'next/router';
import { env } from '@/next.config';
import { axios } from '@/services/api';
import { TokenCSRFProvider } from '@/providers/TokenCSRFProvider';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = React.useState(null);

    // !! = short way to cast a variable to be a boolean
    const isAuthenticated = !!user;

    React.useEffect(() => {

        const exec = async () => {
            try {

                const cookies = parseCookies();

                if (!cookies["XSRF-TOKEN"]) {
                    throw new Error("Session Token expired!");
                }

                if (!cookies["next.auth"]) {
                    throw new Error("Authentication Token expired!");
                }

                const headers = {
                    'X-CSRF-Token': cookies["XSRF-TOKEN"],
                    'Authorization': `Bearer ${cookies["next.auth"]}`
                };

                const response = await axios.get(`${env.API_URL}/api/auth-data`, headers);

                setUser(response.data.user);

            } catch (error) {
                console.log(error);
                Router.push("/");
            }
        }

        if (/^\/dashboard/.test(Router.pathname)) {
            exec();
        }

    }, []);

    // When doing login ...
    async function login(form) {
        try {

            const provider = new TokenCSRFProvider();
            const csrfToken = await provider.execute();

            const headers = {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            };

            // Do Login
            const response = await axios.post(`${env.API_URL}/api/login`, {
                email: form.email,
                password: form.password
            }, headers);

            setUser(response.data.user);

            // Params: ctx (server side) or undefined (client side), name, data, time (seconds), route that can access the cookie
            setCookie(null, 'next.auth', response.data.authtoken, {
                maxAge: 120, // seconds
            });

            Router.push("/dashboard");

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // When doing logout ...
    async function logout() {
        try {

            const cookies = parseCookies();

            if (!cookies["XSRF-TOKEN"]) {
                throw new Error("Session Token expired!");
            }

            if (!cookies["next.auth"]) {
                throw new Error("Authentication Token expired!");
            }

            const headers = {
                'X-CSRF-Token': cookies["XSRF-TOKEN"],
                'Authorization': `Bearer ${cookies["next.auth"]}`
            };

            await axios.post(`${env.API_URL}/api/logout`, {}, headers);

            destroyCookie(null, 'next.auth');

        } catch (e) {
            console.log(e)
        } finally {
            Router.push("/");
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook
export function useAuth() {
    return React.useContext(AuthContext);
}

