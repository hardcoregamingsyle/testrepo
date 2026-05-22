import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainLayout } from '../src/components/layout/MainLayout';
import { Navbar } from '../src/components/layout/Navbar';
import { Footer } from '../src/components/layout/Footer';

describe('Layout Components', () => {
  it('renders MainLayout with semantic landmarks', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeDefined();
    expect(screen.getByRole('main')).toBeDefined();
    // Footer is often marked as contentinfo
    expect(screen.getByRole('contentinfo')).toBeDefined();
  });

  it('Navbar renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/SecureApp/i)).toBeDefined();
    expect(screen.getByRole('link', { name: /home/i })).toBeDefined();
  });

  it('Footer displays copyright information', () => {
    render(<Footer />);
    expect(screen.getByText(/SecureApp. All rights reserved./i)).toBeDefined();
  });
});