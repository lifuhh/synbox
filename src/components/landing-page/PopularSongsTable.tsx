import { Table } from '@mantine/core'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { Button } from '@/components/ui/button'
import { useOverflow } from '@/hooks/useOverflow'
import { MouseEventHandler, RefObject, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableSongInfo {
  title: string
  vidURL: string
}

const PopularSongsTable: React.FC = () => {
  const navigate = useNavigate()

  const test_elements: TableSongInfo[] = [
    {
      // TODO: Fix the table being stretched out and not able to use marquee issue some day
      title:
        // 'YOASOBI - 優しい彗星 / THE FIRST TAKE 1abcdefg hijklmad nadgadgad adgda afda asfas as asf sa fas fasf asf as fas fas',
        'YOASOBI - 優しい彗星 / THE FIRST TAKE1',
      vidURL: 'EaA6NlH80wg',
    },
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE2', vidURL: 'EaA6NlH80wg' },
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE3', vidURL: 'EaA6NlH80wg' },
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE4', vidURL: 'EaA6NlH80wg' },
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE5', vidURL: 'EaA6NlH80wg' },
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE6', vidURL: 'EaA6NlH80wg' },
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE7', vidURL: 'EaA6NlH80wg' },
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE8', vidURL: 'EaA6NlH80wg' },
  ]

  const handleTestRowClick =
    (videoId: string): MouseEventHandler<HTMLButtonElement> =>
    () => {
      navigate(`/v/${videoId}`, { state: { videoId: videoId } })
    }

  return (
    <div className='custom-scrollbar mx-auto mt-10 h-96 w-full overflow-y-auto rounded-md lg:ml-6 lg:mt-2 lg:w-5/12 xl:w-4/12'>
      <Table
        stickyHeader
        stickyHeaderOffset={0}
        verticalSpacing='xs'
        highlightOnHover
        className='w-full bg-dark-3 bg-opacity-15'>
        <Table.Thead className='pointer-events-none bg-primary'>
          <Table.Tr>
            <Table.Th className='py-3 text-center'>
              <p>Top 50</p>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {test_elements.map((song, index) => (
            <SongRow
              key={`${song.title}-${index}`}
              song={song}
              onPlayClick={handleTestRowClick}
            />
          ))}
        </Table.Tbody>
        <Table.Caption>Source: YouTube Music Charts</Table.Caption>
      </Table>
    </div>
  )
}

interface SongRowProps {
  song: TableSongInfo
  onPlayClick: (videoId: string) => MouseEventHandler<HTMLButtonElement>
}

const SongRow: React.FC<SongRowProps> = ({ song, onPlayClick }) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useOverflow(textRef, containerRef, 'marquee')

  return (
    <Table.Tr className='playlist-item'>
      <Table.Td>
        <div className='flex max-w-full items-center justify-between'>
          <div
            ref={containerRef}
            className='marquee mr-2 w-full overflow-hidden'>
            <span ref={textRef} className='inline-block overflow-hidden'>
              {song.title}
            </span>
          </div>
          <Button
            variant={'outline'}
            size='icon'
            className='flex-shrink-0 bg-secondary'
            onClick={onPlayClick(song.vidURL)}>
            <PlayArrowIcon className='h-4 w-4' />
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  )
}

export default PopularSongsTable
