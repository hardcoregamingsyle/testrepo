import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<'loading' | 'authenticated' | 'unauthorized'>('loading');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    // ... logic to verify session ...
    return () => { isMounted.current = false; };
  }, []);

  if (auth === 'loading') return <div>Loading...</div>;
  if (auth === 'unauthorized') return <Navigate to="/login" />;
  return <>{children}</>;
};