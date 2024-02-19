import { Link, useNavigate } from 'react-router-dom'

import { SynboxLogo } from '../svgicons'
import { Button } from '../ui/button'

const NowPlayingDisplay = () => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    <div className='flex flex-shrink-0 items-center p-5'>
      <Link to='/'>
        <Button aria-label='Toggle menu' onClick={handleOnClick}>
          <SynboxLogo />
        </Button>
      </Link>
    </div>
  )
}
export default NowPlayingDisplay
