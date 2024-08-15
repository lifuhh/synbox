import { Pause, Play } from 'lucide-react'
import React, { useEffect } from 'react'

const PlayPauseAnimation = ({ isPlaying, visible, onAnimationComplete }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onAnimationComplete()
      }, 300) // Match this with the CSS transition duration

      return () => clearTimeout(timer)
    }
  }, [visible, onAnimationComplete])

  return (
    <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
      <div
        className={`
          flex h-24 w-24
          items-center justify-center rounded-full bg-gray-800 bg-opacity-70
          transition-all duration-300 ease-out
          ${visible ? 'scale-100 opacity-70' : 'scale-200 opacity-0'}
        `}>
        {isPlaying ? (
          <Pause className='text-white' size={48} />
        ) : (
          <Play className='text-white' size={48} />
        )}
      </div>
    </div>
  )
}

export default PlayPauseAnimation
