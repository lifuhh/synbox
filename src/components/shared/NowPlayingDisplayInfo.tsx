import { Link, useNavigate } from 'react-router-dom'

import { SynboxLogo } from '../svgicons'

const NowPlayingDisplayInfo = () => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    <div className='flex flex-shrink-0 items-center w-48'>
      <Link to='/'>
        <button aria-label='Toggle menu' onClick={handleOnClick}>
          <SynboxLogo />
        </button>
      </Link>
    </div>
  )
}
export default NowPlayingDisplayInfo
