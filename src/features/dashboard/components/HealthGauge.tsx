import React, { memo } from 'react';
import { Card } from '@/components/ui/Card';

interface HealthGaugeProps {
  value: number;
}

export const HealthGauge = memo(({ value }: HealthGaugeProps) => {
  const color = value > 80 ? 'text-green-500' : value > 50 ? 'text-yellow-500' : 'text-red-500';
  
  return (
    <Card className="flex flex-col items-center justify-center">
      <h3 className="text-sm font-medium text-gray-500 mb-2">System Health</h3>
      <div className={`text-4xl font-bold ${color}`}>
        {value}%
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
        <div 
          className={`h-full ${value > 80 ? 'bg-green-500' : value > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </Card>
  );
});

HealthGauge.displayName = 'HealthGauge';