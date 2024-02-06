import BottomBar from '@/components/shared/BottomBar'
import PlayerTest from '@/components/shared/PlayerTest'
import { useLocation, useParams } from 'react-router-dom'

const PlayerPage = () => {
  const { id } = useParams()
  const location = useLocation()

  const videoDetails = location.state?.videoDetails

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      {videoDetails && <PlayerTest videoDetails={videoDetails} />}
      <h1>Test lol</h1>
      <h1>{id}</h1>
      <BottomBar />
    </div>
  )
}
export default PlayerPage
