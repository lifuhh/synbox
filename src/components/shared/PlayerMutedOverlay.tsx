import { Text } from '@mantine/core'
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
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      onClick={isInitializing ? () => {} : handleInitMutedPlay}
      className={`absolute inset-0 flex h-full w-full ${isInitializing ? '' : 'cursor-pointer'} flex-col items-center justify-center gap-4 bg-black bg-opacity-50 px-4 text-center text-white backdrop-blur-lg`}>
      {isInitializing ? (
        <div className='unselectable flex items-center gap-2'>
          <LoaderIcon className='h-10 w-10 animate-spin' />
          <Text className='text-xl font-medium'>Initializing...</Text>
        </div>
      ) : (
        <div className='flex-center unhighlightable flex-col'>
          <div className='flex items-center gap-2'>
            <CheckIcon className='h-10 w-10 animate-pulse' />
            <Text className='text-xl font-medium'>Ready!</Text>
          </div>
          <div className='min-w-80 pt-10'>
            <Text className='text-lg'> Click screen to unmute and play</Text>
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
