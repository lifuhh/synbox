import AccountBoxIcon from '@mui/icons-material/AccountBox'
import FavouritesButton from './FavouritesButton'
import AppLogo from './NowPlayingDisplayInfo'

const TopBar = () => {
  // const pathname = window.location.pathname
  // console.log('Pathname in topbar is')
  // console.log(pathname)
  // console.log(pathname.includes('/v/'))

  return (
    // <section className='topbar sticky top-0 bg'>
    <section className='topbar sticky top-0'>
      <div className='flex-between h-14 w-full pt-2 bg-slate-600 bg-opacity-95'>
        <AppLogo />
        <div className='flex-end pb-2 justify-end lg:gap-2 w-48'>
          <AccountBoxIcon
            sx={{ fontSize: 50 }}
            className='flex justify-self-end align-top'
          />
          <FavouritesButton />
        </div>
      </div>
    </section>
  )
}

export default TopBar
