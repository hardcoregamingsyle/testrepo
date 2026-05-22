import React from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import { StatCard } from './components/StatCard';
import { ActivityFeed } from './components/ActivityFeed';
import { HealthGauge } from './components/HealthGauge';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Dashboard: React.FC = () => {
  const { data, loading, error } = useDashboardData();

  if (error) return <div className="text-red-600 p-4" role="alert">{error}</div>;
  if (loading || !data) return <div className="p-4 animate-pulse">Loading dashboard...</div>;

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Users" value={data.stats.totalUsers} />
          <StatCard label="Active Sessions" value={data.stats.activeSessions} />
          <HealthGauge value={data.stats.systemHealth} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ActivityFeed items={data.recentActivity} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;