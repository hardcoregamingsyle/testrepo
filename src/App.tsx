import { useEffect, useState, useCallback } from 'react';
import { apiClient, SchemaRegistry } from './apiClient';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  const checkSession = useCallback(async (signal: AbortSignal) => {
    try {
      await apiClient.request('/auth/session', SchemaRegistry.SESSION, 'GET', undefined, signal);
      setStatus('authenticated');
    } catch (e: any) {
      if (e.name !== 'AbortError') setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    // Fix: Debounce session check to prevent redundant API calls
    const timer = setTimeout(() => {
      checkSession(controller.signal);
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [checkSession]);

  if (status === 'loading') return <div>Loading...</div>;
  return <>{children}</>;
};