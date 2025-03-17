import { axiosInstance } from '@/lib/utils';
import { ZodNullDef } from 'zod';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'advertiser' | 'promoter';
}

const authService = {
  async login(credentials: LoginCredentials) {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    console.log(response.data)
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  async forgotPassword(email: string) {
    try {
      const response = await axiosInstance.post('/api/users/forgot-password', { email });
      console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in forgotPassword service:", error);
      throw error;
    }
  },

  async resetPassword(token: string | null, newPassword: string) {
    const response = await axiosInstance.post('/api/users/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  async verifyEmail(token: string) {
    const response = await axiosInstance.get(`/auth/verify?token=${token}`);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },
};

export default authService;
