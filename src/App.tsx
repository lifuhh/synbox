import { Toaster } from '@/components/ui/toaster'
import '@mantine/core/styles.css'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { LandingPage, PlayerPage, TestPage } from './_root/pages'
import LyricsTestPage from './_root/pages/LyricsTestPage'
import './globals.css'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/v/:videoId' element={<PlayerPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/lyricstest' element={<LyricsTestPage />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}
export default App
