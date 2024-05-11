import { Table } from '@mantine/core'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { Button } from '@/components/ui/button'
import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

//TODO: can probably replace this component with a card & list items instead
const PopularSongsTable = () => {
  const navigate = useNavigate()

  const test_elements = [
    { title: 'YOASOBI - 優しい彗星 / THE FIRST TAKE1', vidURL: 'EaA6NlH80wg' },
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

  const test_rows = test_elements.map((song, id) => {
    return (
      <Table.Tr key={song.title + id}>
        <Table.Td>
          {/* //TODO: fix containment issue */}
          <div
            className='flex-between playlist-item flex align-middle'
            key={song.title}>
            <div className='marquee unselectable max-w-[300px] overflow-hidden whitespace-nowrap'>
              <span className=''>{song.title}</span>
            </div>
            <Button
              variant='outline'
              size='icon'
              className=''
              onClick={handleTestRowClick('EaA6NlH80wg')}>
              <PlayArrowIcon className='h-4 w-4' />
            </Button>
          </div>
        </Table.Td>
        {/* <Table.Td>{element.mass}</Table.Td> */}
      </Table.Tr>
    )
  })

  return (
    <div className=' custom-scrollbar mx-auto mt-10 h-96 w-full overflow-y-auto rounded-md lg:ml-6 lg:mt-2 lg:w-5/12 xl:w-4/12'>
      <Table
        stickyHeader
        stickyHeaderOffset={0}
        verticalSpacing='xs'
        highlightOnHover
        className=' bg-dark-3 bg-opacity-15 '>
        <Table.Thead className=' pointer-events-none bg-dark-4'>
          <Table.Tr>
            <Table.Th className='text-center'>
              <p>Top 50</p>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className=' '>{test_rows}</Table.Tbody>
        <Table.Caption>Source: Apple Music Charts</Table.Caption>
      </Table>
    </div>
  )
}
export default PopularSongsTable
