

import * as React from 'react';
import Router from 'next/router';
import { env } from '@/next.config';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = React.useState(null);

    // !! = short way to cast a variable to be a boolean
    const isAuthenticated = !!user;

    async function verifyAuthentication() {

        try {

            const { 'auth-token': token } = parseCookies();

            if (!token) {
                throw new Error("Token expired!");
                Router.push("/");
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            const response = await axios.get(`${env.API_URL}/auth-data`, { headers });

            setUser(response.data.user);

        } catch (error) {
            console.log(error);
            Router.push("/");
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, verifyAuthentication }}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook
export function useAuth() {
    return React.useContext(AuthContext);
}

