import { useState, useEffect } from 'react';
import api from '../services/api/axiosConfig';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../store/slices/authSlice';

interface User {
    id: string;
    name: string;
    email: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

interface RegisterResponse {
    message: string;
}

interface UseAuthReturn {
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<User | null>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const useAuth = (): UseAuthReturn => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch()

    const login = async (email: string, password: string): Promise<User | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<LoginResponse>('/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            dispatch(setUserProfile(user))

            return user;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await api.post<RegisterResponse>('/auth/register', { fullName, email, password });
            return true;
        } catch (err: any) {
            console.error('Registration failed:', err.response?.data?.error || err.message);
            setError(err.response?.data?.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(setUserProfile(null))
    };

    return {
        loading,
        error,
        login,
        register,
        logout,
    };
};

export default useAuth;
