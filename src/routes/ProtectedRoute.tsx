import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null; // Prevent UI rendering during auth check
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};