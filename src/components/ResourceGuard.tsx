import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ResourceGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();

  if (user?.id !== id) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
};