import { Link, useNavigate } from 'react-router-dom'

import { TempSquareIconTest } from '../svgicons'
import { Button } from '../ui/button'

const NowPlayingDisplay = () => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    <div className='flex items-center justify-between p-5'>
      <Link to='/'>
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
