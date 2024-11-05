import { useAppContext } from '@/context/AppContext'
import { fullscreenAtom, globalControlsVisibilityAtom } from '@/context/atoms'
import { useAtomValue } from 'jotai'
import { useLocation } from 'react-router-dom'
import AppLogo from '../topbar/AppLogo'
import FavouritesDropdownButton from '../topbar/FavouritesDropdownButton'
import HistoryDropdownButton from '../topbar/HistoryDropdownButton'
import ProfileButton from '../topbar/ProfileButton'

const TopBar = () => {
  const { playerControlsVisible } = useAppContext()
  // const globalControlsVisible = useAtomValue(globalControlsVisibilityAtom)
  const location = useLocation()
  const isVideoPlayer = location.pathname.includes('/v/')

  // Return empty fragment instead of null to maintain consistent rendering
  // if (isVideoPlayer && !globalControlsVisible) {
  //   return <></>
  // }

  return (
    <section
      className={`fixed left-0 right-0 top-0 z-50 transition-opacity duration-300
        ${isVideoPlayer ? 'pointer-events-none' : ''}`}>
      <nav
        className={`flex-between h-14 w-full
          ${isVideoPlayer ? 'bg-secondary/0' : 'bg-secondary/50 bg-opacity-80'}
          ${isVideoPlayer ? 'pointer-events-auto' : ''}
          sm:px-4`}>
        {playerControlsVisible && !isVideoPlayer && <AppLogo />}
        <div
          className={`ml-auto mr-2 flex items-center gap-3 
            ${isVideoPlayer ? 'pointer-events-auto' : ''}`}>
          <FavouritesDropdownButton buttonVisibility={true} />
          <HistoryDropdownButton buttonVisibility={true} />
          {!isVideoPlayer && <ProfileButton />}
        </div>
      </nav>
    </section>
  )
}

export default TopBar
