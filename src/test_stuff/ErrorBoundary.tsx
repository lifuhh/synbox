import TopBar from '@/components/shared/TopBar'
import { Button } from '@/components/ui/button'
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

  private handleReturnHome = () => {
    // Navigate to the home page
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='relative h-screen w-full'>
          <TopBar />
          <div className='relative -my-14 flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-md text-center'>
              <div className='mx-auto h-12 w-12 text-primary' />
              <h1 className='text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
                Something Went Wrong
              </h1>
              <p className='text-muted-foreground mt-4'>
                We're sorry — an unexpected error has occurred:
              </p>
              {this.state.error && (
                <p className='text-muted-foreground mt-2'>
                  {this.state.error.toString()}
                </p>
              )}
              <div className='mt-6'>
                <Button onClick={this.handleReturnHome}>Return To Home</Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
