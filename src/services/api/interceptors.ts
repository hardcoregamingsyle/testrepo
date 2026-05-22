import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AuthManager } from '@/authManager';

/**
 * Sets up interceptors for the Axios instance.
 * Ensures CSRF protection and automatic auth injection.
 */
export const setupInterceptors = (axiosInstance: any) => {
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    // CSRF Protection Header
    config.headers.set('X-Requested-With', 'XMLHttpRequest');
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      // Global 401 handling
      if (error.response?.status === 401) {
        await AuthManager.logout();
      }
      return Promise.reject(error);
    }
  );
};