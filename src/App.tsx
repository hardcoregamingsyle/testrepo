import { useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from './authService';
import { getConfig } from './config';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setSession, reset } = useAuthStore();
  const isProcessing = useRef(false);

  const checkSession = useCallback(async () => {
    if (isProcessing.current) return;
    isProcessing.current = true;
    
    try {
      const response = await fetch(`${getConfig().API_URL}/auth/session`);
      if (!response.ok) throw new Error('Auth failed');
      const data = await response.json();
      setSession(data.userId, data.token);
    } catch (err) {
      reset();
    } finally {
      isProcessing.current = false;
    }
  }, [setSession, reset]);

  useEffect(() => {
    let mounted = true;
    if (mounted) checkSession();
    return () => { mounted = false; };
  }, [checkSession]);

  return <>{children}</>;
};

export default function App() { return <AuthProvider><h1>Secure App</h1></AuthProvider>; }