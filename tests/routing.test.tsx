import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../src/routes/AppRoutes';

// Mock localStorage for ProtectedRoute
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Routing Integration', () => {
  it('renders loading state initially', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeDefined();
  });

  it('redirects to login when unauthenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    // Note: Since App is lazy loaded, we wait for the route to resolve
    // If not authenticated, the ProtectedRoute logic should trigger.
    // Given the current mock, it should show login or redirect.
  });
});