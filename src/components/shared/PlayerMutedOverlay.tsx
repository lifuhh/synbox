import { Text } from '@mantine/core'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import React, { useEffect, useState } from 'react'

const PlayerMutedOverlay = ({
  handleInitMutedPlay,
}: {
  handleInitMutedPlay: () => void
}) => {
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 750)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      onClick={isInitializing ? undefined : handleInitMutedPlay}
      className={`flex h-full w-full ${
        isInitializing ? '' : 'cursor-pointer'
      } flex-col items-center justify-center bg-black/30 backdrop-blur-sm`}>
      {isInitializing ? (
        <div className='flex items-center gap-2 rounded-lg  p-4'>
          <LoaderIcon className='h-10 w-10 animate-spin text-white' />
          <Text className='text-xl font-medium text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.8)]'>
            Initializing...
          </Text>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <div className='rounded-xl p-8'>
            <PlayCircleFilledIcon
              className='transition-transform duration-200 hover:scale-105'
              sx={{
                width: '104px',
                height: '104px',
                color: 'white',
                opacity: 0.95,
                '&:hover': {
                  opacity: 1,
                },
              }}
            />
            <div className='mx-auto mt-4 flex items-center justify-center gap-2'>
              <CheckIcon className='h-8 w-8 animate-pulse text-white' />
              <Text className='text-xl font-medium text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.8)]'>
                Ready!
              </Text>
            </div>
          </div>
        </div>
      )}
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
