import { UploadedSrtLine } from '@/types'
import { parseSrt, trimLength } from '@/utils'
import {
  ActionIcon,
  Center,
  CopyButton,
  Divider,
  Paper,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import LyricsUploadContentContainer from './LyricsUploadContentContainer'

interface GeneratedResultsDisplayProps {
  currentParsedSrt: UploadedSrtLine[]
  setCurrentParsedSrt: (parsedSrt: UploadedSrtLine[]) => void
  srtUploaded: boolean
  setSrtUploaded: (srtUploaded: boolean) => void
  srtFileName: string
  setSrtFileName: (srtFileName: string) => void
}

const GeneratedResultsDisplay: React.FC<GeneratedResultsDisplayProps> = ({
  currentParsedSrt,
}) => {
  return (
    <Stack className='bg-secondary max-h-100 min-h-[200px] bg-opacity-15 rounded-lg'>
      <Center className='my-2'>
        <h1>Lyrics Preview [{currentParsedSrt.length} lines]</h1>
      </Center>
      <Center className='flex-start flex-col'>
        <Paper
          shadow='sm'
          p='lg'
          radius='md'
          className='flex flex-col overflow-auto bg-gray-700 border-2 border-secondary w-full h-40 rounded-lg'>
          {currentParsedSrt.map((line, index) => (
            <div key={index}>
              <h1 className='text-center'>{line.text}</h1>
            </div>
          ))}
        </Paper>
      </Center>
    </Stack>
  )
}
export default GeneratedResultsDisplay
