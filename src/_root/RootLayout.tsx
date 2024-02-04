import { Outlet } from 'react-router-dom'

import TopBar from '@/components/shared/TopBar'

const RootLayout = () => {
  return (
    <div className='w-full relative'>
      <TopBar />
      <section className='flex flex-row flex-1 h-full'>
        {/* Outlet lets us show what's gonna be on the Homepage later */}
        <Outlet />
      </section>
    </div>
  )
}
export default RootLayout
