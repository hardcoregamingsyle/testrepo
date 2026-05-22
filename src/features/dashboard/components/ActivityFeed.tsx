import React, { memo } from 'react';
import { Card } from '@/components/ui/Card';
import type { ActivityItem } from '../types';

interface ActivityFeedProps {
  items: ActivityItem[];
}

export const ActivityFeed = memo(({ items }: ActivityFeedProps) => {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-2 last:border-0">
            <span className="text-sm text-gray-700">{item.action}</span>
            <time dateTime={item.timestamp} className="text-xs text-gray-400">
              {new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </time>
          </li>
        ))}
      </ul>
    </Card>
  );
});

ActivityFeed.displayName = 'ActivityFeed';