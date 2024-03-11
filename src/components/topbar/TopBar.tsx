import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SearchBarContainer from '../search/SearchBarContainer'
import FavouritesButton from './FavouritesButton'
import NowPlayingDisplayInfo from './NowPlayingDisplayInfo'

const TopBar = () => {
  // const pathname = window.location.pathname
  // console.log('Pathname in topbar is')
  // console.log(pathname)
  // console.log(pathname.includes('/v/'))

  return (
    <div className='flex-between h-14 w-full pt-2 bg-teal-500 bg-opacity-5 z-50'>
      <NowPlayingDisplayInfo />
      <SearchBarContainer />
      <div className='flex-end pb-2 justify-end lg:gap-2 w-48'>
        <AccountBoxIcon
          sx={{ fontSize: 50 }}
          className='flex justify-self-end align-top'
        />
        <FavouritesButton />
      </div>
    </div>
  )
}

export default TopBar
