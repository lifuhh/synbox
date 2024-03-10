import { Link, useNavigate } from 'react-router-dom'

import { SynboxLogo } from '../svgicons'

const NowPlayingDisplayInfo = () => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    <div className='flex align-middle justify-start w-48 min-w-48 z-20'>
      <Link to='/'>
        <button aria-label='Toggle menu' onClick={handleOnClick}>
          <SynboxLogo />
        </button>
      </Link>
    </div>
  )
}
export default NowPlayingDisplayInfo
