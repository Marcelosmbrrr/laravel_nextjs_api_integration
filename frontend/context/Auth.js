

import * as React from 'react';
import Router from 'next/router';
import { env } from '@/next.config';
import { setCookie, parseCookies } from 'nookies'
import { axios } from '@/services/api';
import { TokenCSRFProvider } from '@/providers/TokenCSRFProvider';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = React.useState(null);

    // !! = short way to cast a variable to be a boolean
    const isAuthenticated = !!user;

    async function refreshData() {
        try {

            const provider = new TokenCSRFProvider();
            const csrfToken = await provider.execute();

            const { 'laranext.token': authtoken } = parseCookies();
            if (!authtoken) {
                throw new Error("Authentication Token expired!");
            }

            const headers = {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
                'Authorization': `Bearer ${authtoken}`
            };

            const response = await axios.get(`${env.API_URL}/auth-data`, headers);

            setUser(response.data.user);

            console.log("Data successful refresh!");
        } catch (error) {
            console.log(error);
            Router.push("/");
        }
    }

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
            setCookie(undefined, 'laranext.token', response.data.authtoken, {
                maxAge: 120, // seconds
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.authtoken}`;

            Router.push("/dashboard");

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // When doing logout ...
    async function logout() {
        try {

            const provider = new TokenCSRFProvider();
            const csrfToken = await provider.execute();

            const { 'laranext.token': authtoken } = parseCookies();

            if (!authtoken) {
                throw new Error("Authentication Token expired!");
            }

            const headers = {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
                'Authorization': `Bearer ${authtoken}`
            };

            await axios.post(`${env.API_URL}/api/logout`, {}, headers);

            destroyCookie(null, 'laranext.token');

            Router.push("/");

        } catch (e) {
            console.log(e)
            Router.push("/");
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, refreshData }}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook
export function useAuth() {
    return React.useContext(AuthContext);
}

