import { Component, ReactNode } from 'react';
import { z } from 'zod';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  render() { 
    return this.state.hasError ? (
      <div role="alert" aria-live="assertive" className="p-4 bg-red-100 text-red-800">
        System Unavailable. Please refresh the page.
      </div>
    ) : this.props.children; 
  }
}