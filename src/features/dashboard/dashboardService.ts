import { request } from '@/apiClient';
import { DashboardDataSchema, type DashboardData } from './types';
import { z } from 'zod';

/**
 * Dashboard Service Layer
 * Fetches secure dashboard metrics with concurrency control.
 */
export const dashboardService = {
  getDashboardData: async (signal?: AbortSignal): Promise<DashboardData> => {
    return await request<DashboardData, undefined>(
      '/dashboard/summary',
      {
        method: 'GET',
        signal,
      },
      DashboardDataSchema
    );
  }
};