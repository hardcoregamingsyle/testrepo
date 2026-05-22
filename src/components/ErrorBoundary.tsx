import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  
  componentDidCatch(error: Error) {
    // SECURE FIX: Replace global event dispatch with local logging
    console.error("Application Error:", error.message);
    // Future: Integrate with Sentry.captureException(error);
  }

  render() {
    return this.state.hasError ? <div>System Unavailable. Please contact support.</div> : this.props.children;
  }
}