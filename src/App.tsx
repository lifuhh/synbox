import { Toaster } from '@/components/ui/toaster'
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation'
import '@mantine/core/styles.css'

import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { AboutPage, LandingPage, PlayerPage } from './_root/pages'
import './globals.css'

const App = () => {
  useKeyboardNavigation()

  return (
    <main className={`flex h-screen bg-background`}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/v/:videoId' element={<PlayerPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}
export default App
