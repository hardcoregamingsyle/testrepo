import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiClient, SchemaRegistry } from '../apiClient';

export const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: 'admin' | 'user' }) => {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'forbidden'>('loading');

  useEffect(() => {
    apiClient.request('/auth/session', SchemaRegistry.SESSION, 'GET')
      .then(s => setStatus(requiredRole && s.role !== requiredRole ? 'forbidden' : 'authorized'))
      .catch(() => setStatus('forbidden'));
  }, [requiredRole]);

  if (status === 'loading') return null;
  if (status === 'forbidden') return <Navigate to="/login" replace />;
  return children;
};