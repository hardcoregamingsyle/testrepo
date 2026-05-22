import { useEffect, useState, useRef } from 'react';
import { apiClient, SchemaRegistry } from './apiClient';

interface AuthProviderProps { children: React.ReactNode; }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    const checkSession = async () => {
      try {
        await apiClient.request('/auth/session', SchemaRegistry.SESSION, 'GET');
        if (isMounted.current) setStatus('authenticated');
      } catch {
        if (isMounted.current) setStatus('unauthenticated');
      }
    };
    void checkSession();
    return () => { isMounted.current = false; };
  }, []);

  if (status === 'loading') return <div>Loading...</div>;
  return <>{children}</>;
};