import { z } from 'zod';
import { request } from '@/apiClient';
import { LoginSchema, AuthResponseSchema, type LoginPayload, type AuthResponse } from './types';

/**
 * Authentication Service Layer
 * Optimised with AbortController support and strict error handling.
 */
export const authService = {
  login: async (credentials: LoginPayload, signal?: AbortSignal): Promise<AuthResponse> => {
    try {
      return await request<AuthResponse, LoginPayload>(
        '/auth/login',
        {
          method: 'POST',
          body: credentials,
          requestSchema: LoginSchema,
          // @ts-expect-error: Extending request to support signal
          signal,
        },
        AuthResponseSchema
      );
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('AUTH_REQUEST_ABORTED');
      }
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Using z.literal for strict void-like response validation
      await request<undefined, undefined>(
        '/auth/logout',
        { method: 'POST' },
        z.undefined()
      );
    } catch (e) {
      console.error('Logout failed, forcing local cleanup', e);
    } finally {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  }
};