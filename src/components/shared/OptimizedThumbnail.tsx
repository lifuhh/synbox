import { useState } from 'react'

const OptimizedThumbnail = ({ src, alt, onClick, className }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='relative aspect-video h-[50px] w-[80px] flex-shrink-0 overflow-hidden rounded-sm'>
      {isLoading && (
        <div className='absolute inset-0 animate-pulse bg-gray-800' />
      )}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className || ''}`}
        onClick={onClick}
        onLoad={() => setIsLoading(false)}
        loading='lazy'
      />
    </div>
  )
}

export default OptimizedThumbnail
