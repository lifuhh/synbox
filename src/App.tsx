import { createServer } from 'miragejs'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { LandingPage, PlayerPage, TestPage } from './_root/pages'

import { Toaster } from '@/components/ui/toaster'
import { useEffect, useState } from 'react'
import { SampleLandingPageV0 } from './components/sample-landing-page-v0'
import './globals.css'

createServer({
  routes() {
    this.get('/api/users', () => [
      { id: '1', name: 'Luke' },
      { id: '2', name: 'Leia' },
      { id: '3', name: 'Anakin' },
    ])
  },
})

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((json) => {
        setUsers(json)
        console.log(json)

        return json
      })
  }, [])

  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        {/* <Route element={<AuthLayout />}>
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Route> */}

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/v/:videoId' element={<PlayerPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/test2' element={<SampleLandingPageV0 />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}
export default App
