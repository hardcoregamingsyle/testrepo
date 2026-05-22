import { createContext, useEffect, useState } from 'react';
import { apiClient, SchemaRegistry } from './apiClient';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated' | 'offline'>('loading');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.request('/auth/session', SchemaRegistry.SESSION, 'GET');
        setStatus('authenticated');
      } catch (e: any) {
        if (!navigator.onLine) setStatus('offline');
        else setStatus('unauthenticated');
      }
    };
    checkAuth();
  }, []);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'offline') return <div>Network error. Please check your connection.</div>;
  return <>{children}</>;
};