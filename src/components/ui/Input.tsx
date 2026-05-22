import React, { forwardRef, memo } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = memo(forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, required, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    
    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 w-full',
            error 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs text-red-600 mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
));

Input.displayName = 'Input';