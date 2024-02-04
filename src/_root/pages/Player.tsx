import BottomBar from '@/components/shared/BottomBar'
import PlayerTest from '@/components/shared/PlayerTest'

const Player = () => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <PlayerTest />
      {/* Add lyrics displayer */}
      <BottomBar />
    </div>
  )
}
export default Player
