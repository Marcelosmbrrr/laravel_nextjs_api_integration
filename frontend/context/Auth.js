

import * as React from 'react';
import { setCookie } from 'nookies'
import Router from 'next/router';
import { env } from '@/next.config';
import { parseCookies } from 'nookies';
import { axios } from '@/services/api';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = React.useState(null);

    // !! = short way to cast a variable to be a boolean
    const isAuthenticated = !!user;

    // When refresh page ...
    React.useEffect(() => {
        refreshData();
    }, []);

    function setAuthHeaders(authtoken, csrftoken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${authtoken}`;
        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrftoken;
    }

    // When login ...
    async function login(form) {
        try {

            // Get Token CSRF
            // https://laravel.com/docs/9.x/sanctum#csrf-protection
            const response_csrf = await axios.get(`${env.API_URL}/sanctum/csrf-cookie`);

            // Do Login
            const response_login = await axios.post(`${env.API_URL}/api/login`, {
                email: form.email,
                password: form.password
            });

            const authtoken = response_login.data.authtoken;
            const csrftoken = response_csrf.data.csrftoken;

            setUser(response.data.user);

            // Params: ctx (server side) or undefined (client side), name, data, time (seconds), route that can access the cookie
            setCookie(undefined, 'laranext.token', response.data.authtoken, {
                maxAge: 120, // seconds
            });

            setAuthHeaders(authtoken, csrftoken);

            Router.push("/dashboard");

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // When logout ...
    async function logout() {
        try {



        } catch (e) {
            console.log(e);
        }
    }

    // To refresh sanctum and CSRF ...
    async function renewTokens() {
        try {
            //
        } catch (e) {
            console.log(e);
        }
    }

    async function refreshData() {

        try {

            const { 'laranext.token': authtoken } = parseCookies();
            const { 'XSRF-TOKEN': csrftoken } = parseCookies();

            if (!authtoken) {
                throw new Error("Token expired!");
                Router.push("/");
            }

            setAuthHeaders(authtoken, csrftoken);

            const response = await axios.get(`${env.API_URL}/auth-data`);

            setUser(response.data.user);

        } catch (error) {
            console.log(error);
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

