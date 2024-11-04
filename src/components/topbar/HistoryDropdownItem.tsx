import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useOverflow } from '@/hooks/useOverflow'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

interface FavouritesDropdownItemProps {
  videoId: string
  title: string
  author: string
  thumbnailUrl: string
}

const FavouritesDropdownItem: React.FC<FavouritesDropdownItemProps> = ({
  videoId,
  title,
  author,
  thumbnailUrl,
}) => {
  const navigate = useNavigate()
  const textRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const handleRowClick = (videoId: string) => () => {
    navigate(`/v/${videoId}`)
  }

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && containerRef.current) {
        setIsOverflowing(
          textRef.current.scrollWidth > containerRef.current.clientWidth,
        )
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [title])

  useOverflow(textRef, containerRef, 'marquee')

  const handleClick = () => {
    navigate(`/v/${videoId}`)
  }

  return (
    <DropdownMenuItem className='p-2'>
      <div className='playlist-item flex h-full w-full items-center space-x-2'>
        <img
          src={thumbnailUrl}
          alt={title}
          className='rounded-xs h-12 w-auto cursor-pointer object-cover'
          onClick={handleClick}
        />
        <div className='min-w-0 flex-grow'>
          <div
            ref={containerRef}
            className={`font-bold tracking-wide text-zinc-100 ${
              isOverflowing ? 'marquee' : 'overflow-hidden'
            }`}
            onClick={handleClick}>
            <span
              ref={textRef}
              className={`inline-block cursor-pointer whitespace-nowrap ${
                isOverflowing ? 'marquee-content' : ''
              }`}>
              {title}
            </span>
          </div>
          <div className='truncate text-sm text-gray-400'>{author}</div>
        </div>
        <Button
          variant='link'
          size='icon'
          className='flex-shrink-0 bg-secondary'
          onClick={handleRowClick(videoId)}>
          <PlayArrowIcon className='h-4 w-4' />
        </Button>
      </div>
    </DropdownMenuItem>
  )
}

export default FavouritesDropdownItem
