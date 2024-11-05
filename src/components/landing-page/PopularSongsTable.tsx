import { Button } from '@/components/ui/button'
import { useOverflow } from '@/hooks/useOverflow'
import { useGetChartsPlaylist } from '@/lib/react-query/queriesAndMutations'
import { Loader } from '@mantine/core'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPageCharts: React.FC = () => {
  const navigate = useNavigate()
  const { data: chartsData, isLoading: isChartsDataFetching } =
    useGetChartsPlaylist()

  const handleRowClick = (videoId: string) => () => {
    navigate(`/v/${videoId}`)
  }

  // Calculate the height for 6 items
  const tableBodyHeight = 6 * 55 // Assuming each row is 52px

  return (
    <div className='w-full rounded-md border border-primary/30 bg-background lg:ml-6 lg:mt-2 lg:w-5/12 xl:w-4/12'>
      <div className='bg-dark-3 relative overflow-hidden rounded-md bg-opacity-15'>
        <table
          className='w-full border-collapse'
          style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: 'calc(100% - 60px)' }} />
            <col style={{ width: '60px' }} />
          </colgroup>
          <thead>
            <tr className='bg-muted text-white'>
              <th className='unselectable py-3 text-center' colSpan={2}>
                YouTube Charts
              </th>
            </tr>
          </thead>
        </table>
        <div
          className='no-scrollbar overflow-y-auto'
          style={{ height: `${tableBodyHeight}px` }}>
          <table
            className='w-full border-collapse'
            style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: 'calc(100% - 60px)' }} />
              <col style={{ width: '60px' }} />
            </colgroup>
            <tbody>
              {isChartsDataFetching
                ? Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <tr key={index} className='h-13 '>
                        <td colSpan={2} className='py-2'>
                          {index === 2 && (
                            <div className='flex justify-center'>
                              <Loader color='pink' size='lg' type='dots' />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                : chartsData?.map((song, index) => (
                    <SongRow
                      key={`${song.title}-${index}`}
                      song={{
                        title: song.title,
                        vidURL: song.id,
                      }}
                      onPlayClick={handleRowClick}
                    />
                  ))}
            </tbody>
            <caption className='mb-2 mt-1 caption-bottom text-sm text-gray-300'>
              Source: Top 100 Japan YouTube
            </caption>
          </table>
        </div>
      </div>
    </div>
  )
}

interface SongRowProps {
  song: {
    title: string
    vidURL: string
  }
  onPlayClick: (videoId: string) => () => void
}

const SongRow = ({ song, onPlayClick }: SongRowProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useOverflow(textRef, containerRef, 'marquee')

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
  }, [song.title])

  return (
    <tr className='playlist-item h-13 bg-card/80 text-accent-foreground hover:bg-muted-foreground/20'>
      <td className='p-2'>
        <div
          ref={containerRef}
          className={`overflow-hidden ${isOverflowing ? 'marquee' : ''}`}>
          <span
            ref={textRef}
            className={`unselectable inline-block whitespace-nowrap ${
              isOverflowing ? 'marquee-content' : ''
            }`}>
            {song.title}
          </span>
        </div>
      </td>
      <td className='p-2'>
        <Button
          variant='link'
          size='icon'
          className='flex-shrink-0 bg-secondary'
          onClick={onPlayClick(song.vidURL)}>
          <PlayArrowIcon className='h-4 w-4' />
        </Button>
      </td>
    </tr>
  )
}

export default LandingPageCharts
