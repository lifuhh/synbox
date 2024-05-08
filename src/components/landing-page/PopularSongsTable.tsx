import { Table } from '@mantine/core'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { Button } from '@/components/ui/button'
import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

//TODO: can probably replace this component with a card & list items instead
const PopularSongsTable = () => {
  const navigate = useNavigate()

  const test_elements = [
    { position: 1, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 6, mass: 12.011, symbol: 'Caa', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'Nbb', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Ycc', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Bedea', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Cegdd', name: 'Cerium' },
    { position: 6, mass: 12.011, symbol: 'X', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'D', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'ADGDAG', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'zzxv', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'dgadga', name: 'Cerium' },
  ]

  const handleTestRowClick =
    (videoId: string): MouseEventHandler<HTMLButtonElement> =>
    () => {
      navigate(`/v/${videoId}`, { state: { videoId: videoId } })
    }

  const test_rows = test_elements.map((element) => {
    return (
      <Table.Tr key={element.symbol}>
        <Table.Td>
          {/* //TODO: fix containment issue */}
          <div
            className='flex flex-between align-middle playlist-item'
            key={element.mass}>
            <div className='whitespace-nowrap overflow-hidden max-w-[300px] marquee unselectable'>
              <span className=''>YOASOBI - 優しい彗星 / THE FIRST TAKE</span>
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
    <div className=' w-full mx-auto lg:ml-6 lg:w-5/12 xl:w-4/12 mt-10 lg:mt-2 h-96 rounded-md overflow-y-auto custom-scrollbar'>
      <Table
        stickyHeader
        stickyHeaderOffset={0}
        verticalSpacing='xs'
        highlightOnHover
        className=' bg-dark-3 bg-opacity-15 '>
        <Table.Thead className=' bg-dark-4 pointer-events-none'>
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
