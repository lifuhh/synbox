import { Outlet, useLocation } from 'react-router-dom'

import TopBar from '@/components/shared/TopBar'
import PlayerBottomBar from '@/components/shared/PlayerBottomBar'

const RootLayout = () => {
  const location = useLocation()

  return (
    <div className='w-full relative'>
      <TopBar />
      <section className='flex flex-1 h-full'>
        {/* Outlet lets us show what's gonna be on the Landing Page later */}
        <Outlet />
      </section>
    </div>
  )
}
export default RootLayout
