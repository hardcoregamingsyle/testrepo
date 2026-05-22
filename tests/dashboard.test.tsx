import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActivityFeed } from '../src/features/dashboard/components/ActivityFeed';
import { HealthGauge } from '../src/features/dashboard/components/HealthGauge';
import { StatCard } from '../src/features/dashboard/components/StatCard';

describe('Dashboard Components', () => {
  it('ActivityFeed renders list items correctly', () => {
    const items = [{ id: '1', action: 'Login', timestamp: new Date().toISOString(), user: 'admin' }];
    render(<ActivityFeed items={items} />);
    expect(screen.getByText('Login')).toBeDefined();
  });

  it('HealthGauge displays correct color logic', () => {
    const { rerender } = render(<HealthGauge value={90} />);
    expect(screen.getByText('90%').className).toContain('text-green-500');
    
    rerender(<HealthGauge value={30} />);
    expect(screen.getByText('30%').className).toContain('text-red-500');
  });

  it('StatCard displays provided props', () => {
    render(<StatCard label="Test" value={100} />);
    expect(screen.getByText('Test')).toBeDefined();
    expect(screen.getByText('100')).toBeDefined();
  });
});