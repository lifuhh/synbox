import { Button } from '@/components/ui/button'
import { useLocation } from 'react-router-dom'
import { GitHubIcon } from '../svgicons'
import AppLogo from '../topbar/AppLogo'
import CommandSearch from '../topbar/CommandSearch'

import { useAppContext } from '@/context/AppContext'
import { fullscreenAtom } from '@/context/atoms'
import { useAtomValue } from 'jotai'
import FavouritesDropdownButton from '../topbar/FavouritesDropdownButton'
import ProfileButton from '../topbar/ProfileButton'

const TopBar = () => {
  const { playerControlsVisible } = useAppContext()
  const isFullscreen = useAtomValue(fullscreenAtom)

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
      className={`topbar controls sticky top-0 z-100 ${
        isFullscreen ? 'hidden' : 'block'
      }`}>
      <nav
        className={`flex-between h-14 w-full bg-dark-1 ${
          isVideoPlayer ? 'bg-opacity-0' : 'bg-opacity-80'
        } sm:px-4
         ${playerControlsVisible ? '' : 'hidden'}
        `}>
        {playerControlsVisible && <AppLogo />}
        {/* <div className='flex-end pb-2 justify-end lg:gap-2 w-48'>
          <AccountBoxIcon
            sx={{ fontSize: 50 }}
            className='flex justify-self-end align-top'
          />
          <FavouritesButton />
        </div> */}
        <div
          className={`ml-auto mr-2 flex items-center gap-3 ${playerControlsVisible ? '' : 'hidden'} `}>
          {/* <CommandSearch isVideoPlayer={isVideoPlayer} /> */}
          {/* <Button
            variant='outline'
            size='icon'
            className={`border-primary hover:border-white ${buttonVisibility}`}>
            <GitHubIcon className='scale-75 fill-white' />
            <span className='sr-only'>GitHub Button</span>
          </Button> */}
          <FavouritesDropdownButton buttonVisibility={buttonVisibility} />
          {!isVideoPlayer && <ProfileButton />}
        </div>
      </nav>
    </section>
  )
}

export default TopBar
