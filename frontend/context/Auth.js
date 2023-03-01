

import * as React from 'react';
import { env } from '@/next.config';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = React.useState(null);

    // !! = short way to cast a variable to be a boolean
    const isAuthenticated = !!user;

    // Check if user is authenticated and refresh user state
    // This wil be call when user refreh the page
    React.useEffect(() => {

        const token = localStorage.getItem('authtoken');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        if (!!token) {
            axios.get(`${env.API_URL}/auth-data`, { headers })
                .then((response) => {
                    setUser(response.data.user);
                })
        }

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook
export function useAuth() {
    return React.useContext(AuthContext);
}

