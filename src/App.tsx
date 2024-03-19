import { Toaster } from '@/components/ui/toaster'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import {
  LandingPage,
  NewLandingPage,
  PlayerPage,
  TestPage,
} from './_root/pages'
// import { useEffect, useState } from 'react'
import '@mantine/core/styles.css'
import './globals.css'

import { MantineProvider } from '@mantine/core'

const App = () => {
  return (
    <MantineProvider defaultColorScheme='auto'>
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
            <Route path='/new' element={<NewLandingPage />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    </MantineProvider>
  )
}
export default App
