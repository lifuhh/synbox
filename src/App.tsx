import { Toaster } from '@/components/ui/toaster'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { LandingPage, PlayerPage, TestPage } from './_root/pages'
import '@mantine/core/styles.css'
import './globals.css'



const App = () => {
  return (

        <main className='flex h-screen'>
          <Routes>
            {/* auth routes */}
            {/* <Route element={<AuthLayout />}>
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Route> */}
            <Route element={<RootLayout />}>
              <Route index element={<LandingPage />} />
              <Route path='/v/:videoId' element={<PlayerPage />} />
              <Route path='/test' element={<TestPage />} />
            </Route>
          </Routes>
          <Toaster />
        </main>

  )
}
export default App
