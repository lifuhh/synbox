import { Link, useNavigate } from 'react-router-dom'

import { SynboxLogo } from '../svgicons'

const AppLogo = () => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    //TODO: added pt-2 to offset the logo from the top of the screen, check here it affects the 14 offset for top bar
    <div className='z-20 flex w-48 min-w-48 justify-start pt-2 align-middle'>
      <Link to='/'>
        <button aria-label='Home Button' onClick={handleOnClick}>
          <SynboxLogo />
        </button>
      </Link>
    </div>
  )
}
export default AppLogo
