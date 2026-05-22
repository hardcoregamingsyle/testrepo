import { describe, it, expect, vi } from 'vitest';
import { dashboardService } from '../src/features/dashboard/dashboardService';

vi.mock('../src/apiClient', () => ({
  request: vi.fn().mockResolvedValue({
    stats: { totalUsers: 10, activeSessions: 2, systemHealth: 95 },
    recentActivity: []
  })
}));

describe('Dashboard Service', () => {
  it('should fetch and validate dashboard data', async () => {
    const data = await dashboardService.getDashboardData();
    expect(data.stats.totalUsers).toBe(10);
    expect(data.stats.systemHealth).toBe(95);
  });
});