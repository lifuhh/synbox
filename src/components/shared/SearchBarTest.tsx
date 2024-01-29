import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

const SearchBarTest = () => {
  return (
    <div className='flex justify-center items-center py-4'>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
        }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search YouTube'
          inputProps={{ 'aria-label': 'search YouTube' }}
        />
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
export default SearchBarTest
