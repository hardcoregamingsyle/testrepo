import { Component, ReactNode, ErrorInfo } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Send to remote logging service (e.g., Sentry)
    // logToRemote(error, errorInfo);
  }

  render() {
    return this.state.hasError ? <div>A secure system error occurred.</div> : this.props.children;
  }
}