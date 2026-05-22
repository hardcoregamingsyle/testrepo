import { useState, useEffect, useRef } from 'react';
import { dashboardService } from '../dashboardService';
import { apiCache } from '@/store/slices/apiCache';
import type { DashboardData } from '../types';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(() => apiCache.get('dashboard') || null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const result = await dashboardService.getDashboardData(controller.signal);
        if (mounted.current) {
          apiCache.set('dashboard', result);
          setData(result);
        }
      } catch (err) {
        if (mounted.current && !(err instanceof Error && err.name === 'AbortError')) {
          setError('Failed to load dashboard data');
        }
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    if (!data) void fetchData();
    return () => { 
      mounted.current = false; 
      controller.abort(); 
    };
  }, [data]);

  return { data, loading, error };
};