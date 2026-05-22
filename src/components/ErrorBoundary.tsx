import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  
  componentDidCatch(error: Error) {
    // Structured logging integration point
    window.dispatchEvent(new CustomEvent('log-error', { detail: error }));
  }

  render() {
    return this.state.hasError ? <div>System Unavailable. Please contact support.</div> : this.props.children;
  }
}