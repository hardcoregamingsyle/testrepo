import { useEffect, useState, useCallback } from 'react';
import { apiClient, SchemaRegistry } from './apiClient';
import { ErrorBoundary } from './components/ErrorBoundary';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated' | 'error'>('loading');
  const [sessionData, setSessionData] = useState<{csrf: string, issuedAt: number} | null>(null);

  const checkSession = useCallback(async (signal: AbortSignal) => {
    try {
      const data = await apiClient.request('/auth/session', SchemaRegistry.SESSION, 'GET', undefined, undefined, signal);
      setSessionData(prev => {
        if (prev && data.issuedAt <= prev.issuedAt) return prev;
        return { csrf: data.csrfToken, issuedAt: data.issuedAt };
      });
      setStatus('authenticated');
    } catch (e: any) {
      if (e.name !== 'AbortError') setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    checkSession(controller.signal);
    const interval = setInterval(() => checkSession(controller.signal), 60000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [checkSession]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>System Error.</div>;
  return <>{children}</>;
};

export default function App() {
  return <ErrorBoundary><AuthProvider><h1>Secure App</h1></AuthProvider></ErrorBoundary>;
}