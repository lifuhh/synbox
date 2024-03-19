import { Table } from '@mantine/core'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { Button } from '@/components/ui/button'
import { Divider } from '@mantine/core'

const PopularSongsTable = () => {
  const test_elements = [
    { position: 1, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ]

  const test_rows = test_elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
        {/* //TODO: fix containment issue */}
        <div className='flex flex-between align-middle'>
          <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
            YOASOBI - 優しい彗星 / THE FIRST TAKE
            {/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
          </p>
          <Button variant='outline' size='icon'>
            <PlayArrowIcon className='h-4 w-4' />
          </Button>
        </div>
      </Table.Td>
      {/* <Table.Td>{element.mass}</Table.Td> */}
    </Table.Tr>
  ))

  return (
    <div className='w-4/5 mx-auto sm:mx-4 sm:w-1/3 lg:w-2/3 mt-8 lg:mx-8 h-96 overflow-y-auto rounded-md'>
      <Table
        stickyHeader
        stickyHeaderOffset={0}
        verticalSpacing='xs'
        highlightOnHover
        className=' bg-background bg-opacity-70'>
        <Table.Thead className=' bg-dark-4'>
          <Table.Tr>
            <Table.Th className='text-center'>
              <p>Top 100 Apple Music Charts</p>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{test_rows}</Table.Tbody>
        <Table.Caption>Something To Say Here</Table.Caption>
      </Table>
    </div>
  )
}
export default PopularSongsTable
