import { AxiosError } from 'axios';
import { ApiError } from './types';
import { AuthEvents } from '../authEvents';

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      AuthEvents.emit('unauthorized');
    }
    return {
      code: error.response?.status.toString() ?? 'NETWORK_ERROR',
      message: error.response?.data?.message ?? error.message,
      details: error.response?.data
    };
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'An unexpected error occurred'
  };
};