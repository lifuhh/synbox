import { Loader } from '@mantine/core'

const PlayerMutedOverlay = ({
  handleInitMutedPlay,
}: {
  handleInitMutedPlay: () => void
}) => {
  return (
    <div
      onClick={handleInitMutedPlay}
      // className='z-990 mx-auto flex h-full w-screen cursor-pointer flex-col flex-wrap content-evenly items-center justify-center'
      className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 px-4 text-center backdrop-blur-lg'>
      <div className='mb-20 min-w-full'>
        <Loader color='white' size='xl' type='bars' />
      </div>
      <div className='flex items-center gap-2'>
        <LoaderIcon className='h-6 w-6 animate-spin' />
        <div className='text-primary-foreground text-lg font-medium'>
          Initializing...
        </div>
      </div>
      {/* <div className='flex items-center gap-2'>
        <CheckIcon className='h-6 w-6 animate-pulse' />
        <div className='text-primary-foreground text-lg font-medium'>Ready</div>
      </div> */}
    </div>
  )
}
export default PlayerMutedOverlay

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M20 6 9 17l-5-5' />
    </svg>
  )
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <polyline points='7 10 12 15 17 10' />
      <line x1='12' x2='12' y1='15' y2='3' />
    </svg>
  )
}

function LoaderIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M12 2v4' />
      <path d='m16.2 7.8 2.9-2.9' />
      <path d='M18 12h4' />
      <path d='m16.2 16.2 2.9 2.9' />
      <path d='M12 18v4' />
      <path d='m4.9 19.1 2.9-2.9' />
      <path d='M2 12h4' />
      <path d='m4.9 4.9 2.9 2.9' />
    </svg>
  )
}
