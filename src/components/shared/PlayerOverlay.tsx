import { Loader } from '@mantine/core'

const PlayerOverlay = ({
  handleInitMutedPlay,
}: {
  handleInitMutedPlay: () => void
}) => {
  return (
    <div
      onClick={handleInitMutedPlay}
      className='z-990 mx-auto flex h-screen w-screen cursor-pointer flex-col flex-wrap content-evenly justify-center'>
      <Loader color='red' size='xl' type='bars' />
      <h1>Loading...</h1>
      <h1>Press Play!</h1>
    </div>
  )
}
export default PlayerOverlay
