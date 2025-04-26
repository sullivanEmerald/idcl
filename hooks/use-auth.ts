 
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/utils';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'advertiser' | 'promoter';
  emailVerified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add computed properties
  const isAuthenticated = Boolean(user);
  const userRole = user?.role || null;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // First verify token expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          throw new Error('Token expired');
        }

        // Then get fresh user data from the server
        const response = await axiosInstance.get('/auth/me');
        const userData = response.data;

        setUser({
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          emailVerified: userData.emailVerified
        });

        // Update localStorage with fresh data
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userName', `${userData.firstName} ${userData.lastName}`);
        localStorage.setItem('userRole', userData.role);
      } catch (err) {
        console.error('Auth error:', err);
        setError('Authentication failed');
        // Clear all auth data if token is invalid
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'advertiser' | 'promoter';
  }) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    isAuthenticated,
    userRole
  };
}
