import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  
  render() {
    if (this.state.hasError) return (
      <div>
        System Error. 
        <button onClick={() => this.setState({ hasError: false })}>Retry</button>
      </div>
    );
    return this.props.children;
  }
}