// ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })
    console.error('Uncaught error:', error, errorInfo)
    // You can also log the error to an error reporting service here
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <h1>Oops, something went wrong</h1>
          <p>
            We're sorry — something's gone wrong. Our team has been notified.
          </p>
          {this.state.error && <p>{this.state.error.toString()}</p>}
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
