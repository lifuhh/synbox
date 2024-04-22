import { MantineProvider } from '@mantine/core'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AppProvider from './context/AppContext'
import { QueryProvider } from './lib/react-query/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MantineProvider defaultColorScheme='auto'>
      <AppProvider>
        <QueryProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </AppProvider>
    </MantineProvider>
  </BrowserRouter>
)
