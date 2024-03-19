import TopBar from '@/components/shared/TopBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full'>
      <TopBar />
      <section className='flex flex-1 h-full -my-14'>
        {/* Outlet lets us show what's gonna be on the Landing Page later */}
        <Outlet />
      </section>
    </div>
  )
}
export default RootLayout
