import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Fix 06: Prevent open-fail by using explicit loading state
    fetch('/api/auth-check').then(res => {
      setAuthorized(res.ok);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  return authorized ? <>{children}</> : <Navigate to="/login" />;
};