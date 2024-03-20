import { Toaster } from '@/components/ui/toaster'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { LandingPage, PlayerPage, TestPage } from './_root/pages'
// import { useEffect, useState } from 'react'
import '@mantine/core/styles.css'
import './globals.css'

import { MantineProvider } from '@mantine/core'
import AppProvider from './context/AppContext'

const App = () => {
  return (
    <MantineProvider defaultColorScheme='auto'>
      <AppProvider>
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
      </AppProvider>
    </MantineProvider>
  )
}
export default App
