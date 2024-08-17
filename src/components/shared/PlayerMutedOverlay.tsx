import { Loader } from '@mantine/core'

const PlayerMutedOverlay = ({
  handleInitMutedPlay,
}: {
  handleInitMutedPlay: () => void
}) => {
  return (
    <div
      onClick={handleInitMutedPlay}
      className='z-990 mx-auto flex h-full w-screen cursor-pointer flex-col flex-wrap content-evenly items-center justify-center'>
      <h1 className='h-12'>Loading...</h1>
      <h1 className='h-12'>Press Play!</h1>
      <Loader color='red' size='xl' type='bars' />
    </div>
  )
}
export default PlayerMutedOverlay
