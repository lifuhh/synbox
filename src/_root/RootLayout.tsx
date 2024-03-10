import { Outlet, useLocation } from 'react-router-dom'

import BottomBar from '@/components/shared/BottomBar'
import TopBar from '@/components/shared/TopBar'

const RootLayout = () => {
  const location = useLocation()

  return (
    <div className='w-full relative'>
      <TopBar />
      <section className='flex flex-1 max-h-[calc(100vh-56px-56px)]'>
        {/* Outlet lets us show what's gonna be on the Landing Page later */}
        <Outlet />
      </section>
    </div>
  )
}
export default RootLayout
