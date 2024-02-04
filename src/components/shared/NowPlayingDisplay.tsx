import { Link, useLocation, useNavigate } from 'react-router-dom'

import { TempSquareIconTest } from '../svgicons'
import { Button } from '../ui/button'

const NowPlayingDisplay = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOnClick = () => {
    if (location.pathname === '/player') {
      navigate('/')
    } else {
      navigate('/player')
    }
  }

  return (
    <div className='flex items-center justify-between p-5'>
      <Link to={location.pathname === '/player' ? '/' : '/player'}>
        <Button
          className='inline-flex items-center justify-center p-2 rounded-md text-green-700 '
          aria-label='Toggle menu'
          onClick={handleOnClick}>
          <TempSquareIconTest />
        </Button>
      </Link>
    </div>
  )
}
export default NowPlayingDisplay
