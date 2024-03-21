import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { GitHubIcon } from '../svgicons'
import CommandSearch from '../topbar/CommandSearch'
import AppLogo from '../topbar/NowPlayingDisplayInfo'

import { useAppContext } from '@/context/AppContext'

const TopBar = () => {
  const { playerControlsVisible, isFullscreen } = useAppContext()

  const location = useLocation() // Use the useLocation hook to access the current route
  const isVideoPlayer = location.pathname.includes('/v/')
  // Determine the background opacity based on the pathname
  const buttonVisibility = isVideoPlayer ? 'hidden' : 'visible'
  // const pathname = window.location.pathname
  // console.log('Pathname in topbar is')
  // console.log(pathname)
  // console.log(pathname.includes('/v/'))

  return (
    // <section className='topbar sticky top-0 bg'>
    <section
      className={`topbar sticky top-0 z-100 controls ${
        isFullscreen ? 'hidden' : 'block'
      }`}>
      <nav
        className={`flex-between h-14 w-full bg-dark-1 ${
          isVideoPlayer ? 'bg-opacity-0' : 'bg-opacity-80'
        } sm:px-12
         ${playerControlsVisible ? '' : 'hidden'}
        `}>
        <AppLogo />
        {/* <div className='flex-end pb-2 justify-end lg:gap-2 w-48'>
          <AccountBoxIcon
            sx={{ fontSize: 50 }}
            className='flex justify-self-end align-top'
          />
          <FavouritesButton />
        </div> */}
        <div className='flex items-center ml-auto gap-3 mr-2'>
          <CommandSearch isVideoPlayer={isVideoPlayer} />
          {/* <Button className='w-10 h-10 border-primary overflow-hidden'> */}
          {/* <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' /> */}
          {/* <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' /> */}
          <Button
            variant='outline'
            size='icon'
            className={`border-primary hover:border-white ${buttonVisibility}`}>
            <GitHubIcon className='fill-white scale-75' />
            <span className='sr-only'>GitHub Button</span>
          </Button>
          <Button
            variant='outline'
            size='icon'
            className={` border-primary hover:border-white ${buttonVisibility}`}>
            {/* <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' /> */}
            {/* <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' /> */}
            <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
          {/* <Link
            className='text-sm font-medium transition-colors hover:underline pr-5'
            to='/'
            style={{
              fontFamily: 'Inter',
            }}>
            Contact
          </Link> */}
        </div>
      </nav>
    </section>
  )
}

export default TopBar
