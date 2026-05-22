import { useEffect, useState } from 'react';
import { apiClient, SchemaRegistry } from '../apiClient';

export const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: 'admin' | 'user' }) => {
  const [auth, setAuth] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    apiClient.request('/auth/session', SchemaRegistry.SESSION, 'GET', undefined, controller.signal)
      .then(user => {
        if (requiredRole && user.role !== requiredRole) {
          setAuth('unauthorized');
        } else {
          setAuth('authorized');
        }
      })
      .catch(() => setAuth('unauthorized'));
    
    return () => controller.abort();
  }, [requiredRole]);

  if (auth === 'loading') return <div>Loading...</div>;
  if (auth === 'unauthorized') return <div>Access Denied</div>;
  return children;
};