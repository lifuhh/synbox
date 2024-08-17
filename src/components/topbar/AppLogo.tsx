import { Link, useLocation, useNavigate } from 'react-router-dom'

import { SynboxLogo } from '../svgicons'

const AppLogo = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOnClick = () => {
    if (location.pathname === '/') {
      // Scroll to the top of the page and refresh if already on the homepage
      // window.scrollTo({ top: 0, behavior: 'smooth' })
      window.location.reload()
    } else {
      // Navigate to the homepage if on a different page
      navigate('/')
    }
  }

  return (
    //TODO: added pt-2 to offset the logo from the top of the screen, check here it affects the 14 offset for top bar
    // TODO: fix cursor pointer not really working here
    <div className='z-20 flex w-48 min-w-48 cursor-pointer justify-start pt-2 align-middle'>
      <Link to='/'>
        <button aria-label='Home Button' onClick={handleOnClick}>
          <SynboxLogo />
        </button>
      </Link>
    </div>
  )
}
export default AppLogo
