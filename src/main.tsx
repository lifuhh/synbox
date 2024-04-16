import { MantineProvider } from '@mantine/core'
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
        </QueryProvider>
      </AppProvider>
    </MantineProvider>
  </BrowserRouter>
)
