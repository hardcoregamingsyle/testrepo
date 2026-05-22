import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './authStore';
import { getConfig } from './config';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setSession, reset } = useAuthStore();
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkSession = useCallback(async () => {
    if (isChecking) return;
    setIsChecking(true);

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const { API_URL } = await getConfig();
      const start = Date.now();
      const response = await fetch(`${API_URL}/auth/session`, { signal: abortControllerRef.current.signal });
      
      if (!response.ok) throw new Error();

      const serverDate = new Date(response.headers.get('Date') || Date.now()).getTime();
      const offset = serverDate - start;
      const data = await response.json();
      setSession(data, offset);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      reset();
      navigate('/login');
    } finally {
      setIsChecking(false);
    }
  }, [setSession, reset, navigate, isChecking]);

  useEffect(() => {
    checkSession();
    intervalRef.current = window.setInterval(checkSession, 300000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [checkSession]);

  return <>{children}</>;
};

export default function App() { return <AuthProvider><h1>Secure App</h1></AuthProvider>; }