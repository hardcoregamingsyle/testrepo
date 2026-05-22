import React, { Suspense, lazy, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const App = lazy(() => import('@/App'));
const NotFound = lazy(() => import('@/features/errors/NotFound'));

export const AppRoutes: React.FC = memo(() => (
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen animate-pulse text-gray-500">
      Loading...
    </div>
  }>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
));

AppRoutes.displayName = 'AppRoutes';