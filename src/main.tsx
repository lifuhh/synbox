import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AppProvider from './context/AppContext'
import { QueryProvider } from './lib/react-query/QueryProvider'
import ErrorBoundary from './test_stuff/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <HelmetProvider>
      <MantineProvider defaultColorScheme='auto'>
        <AppProvider>
          <QueryProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </QueryProvider>
        </AppProvider>
      </MantineProvider>
    </HelmetProvider>
  </BrowserRouter>,
)
