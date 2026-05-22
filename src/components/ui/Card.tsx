import React, { memo } from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = memo(({ children, className }: CardProps) => (
  <div className={cn('bg-white border border-gray-200 rounded-lg shadow-sm p-6', className)}>
    {children}
  </div>
));

Card.displayName = 'Card';