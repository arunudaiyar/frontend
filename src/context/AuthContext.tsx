"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    token: string | null;
    login: (token: string, email: string) => void;
    logout: () => void;
    userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check for token and email in local storage on initial load
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('userEmail');
        if (storedToken && storedEmail) {
            setToken(storedToken);
            setUserEmail(storedEmail);
        }
    }, []);

    const login = (token: string, email: string) => {
        setToken(token);
        setUserEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', email);
    };

    const logout = () => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        router.push('/login');
    };

    const value: AuthContextType = {
        token,
        login,
        logout,
        userEmail,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
