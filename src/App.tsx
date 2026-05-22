import { createContext, useEffect, useState } from 'react';
import { apiClient, SchemaRegistry } from './apiClient';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'authenticated' | 'unauthenticated'>('idle');

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    apiClient.get('/auth/session', SchemaRegistry.SESSION)
      .then(() => { if (!controller.signal.aborted) setStatus('authenticated'); })
      .catch(() => { if (!controller.signal.aborted) setStatus('unauthenticated'); });
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <div>Loading...</div>;
  return <>{children}</>;
};