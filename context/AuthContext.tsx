import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/services/api';

type User = {
    _id: string;
    name: string;
    createdAt: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    signIn: (name: string, password: string) => Promise<void>;
    signUp: (name: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        };
        loadUser();
    }, []);

    const signIn = async (name: string, password: string) => {
        const response = await api.post('/users/login', { name, password });
        const userData = response.data.user;
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const signUp = async (name: string, password: string) => {
        const response = await api.post('/users/signup', { name, password });
        const userData = response.data;
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
