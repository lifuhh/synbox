import { Toaster } from '@/components/ui/toaster'
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation'
import '@mantine/core/styles.css'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { AboutPage, LandingPage, PlayerPage } from './_root/pages'
import TestDialogPage from './_root/pages/TestDialogPage'
import './globals.css'

const App = () => {
  useKeyboardNavigation()

  return (
    <main className={`flex h-screen`}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/v/:videoId' element={<PlayerPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/test' element={<TestDialogPage />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}
export default App
