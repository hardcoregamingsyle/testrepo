import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  
  componentDidCatch(error: Error, info: any) {
    const sanitizedStack = (info.componentStack as string)
      .replace(/\/[^ ]+\//g, '/') // Remove file paths
      .replace(/at [^ ]+ \(/g, 'at '); // Normalize component names
      
    fetch('/api/log/error', { 
        method: 'POST', 
        body: JSON.stringify({ error: error.message, stack: sanitizedStack }) 
    }).catch(() => {});
  }

  render() { return this.state.hasError ? <div>System Unavailable.</div> : this.props.children; }
}