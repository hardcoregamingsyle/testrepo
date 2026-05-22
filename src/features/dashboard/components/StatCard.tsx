import React, { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  className?: string;
}

export const StatCard = memo(({ label, value, trend, className }: StatCardProps) => (
  <Card className={cn('flex flex-col gap-2', className)}>
    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    {trend && <p className="text-xs text-green-600 font-medium">{trend}</p>}
  </Card>
));

StatCard.displayName = 'StatCard';