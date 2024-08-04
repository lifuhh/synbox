import { Toaster } from '@/components/ui/toaster'
import '@mantine/core/styles.css'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import {
  LandingPage,
  LyricsTestPage,
  PlayerPage,
  TestGeneratePage,
  TestRequestPage,
  TestStreamPage,
  TestUploadPage,
} from './_root/pages'
import TestLyricsPage from './_root/pages/TestLyricsPage'
import './globals.css'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/v/:videoId' element={<PlayerPage />} />
          <Route path='/test' element={<TestGeneratePage />} />
          <Route path='/test2' element={<TestStreamPage />} />
          <Route path='/test_upload' element={<TestUploadPage />} />
          <Route path='/test_lyrics' element={<TestLyricsPage />} />
          <Route path='/test_request' element={<TestRequestPage />} />
          <Route
            path='/lyricstest'
            element={
              <LyricsTestPage
                romajiVisibility={true}
                translationVisibility={true}
              />
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}
export default App
