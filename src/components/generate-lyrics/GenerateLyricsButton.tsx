import { Center } from '@mantine/core'
import { useState } from 'react'
import { Button } from '../ui/button'
import LyricsUploadContentContainer from './LyricsUploadContentContainer'

interface GenerateLyricsButtonProps {
  handleButtonClick: () => void
}

const GenerateLyricsButton: React.FC<GenerateLyricsButtonProps> = ({
  handleButtonClick
}) => {


  

  return (
    <div className='flex flex-col flex-between align-middle max-h-100 min-h-[200px]'>
      <Button onClick={handleButtonClick}  >
        Generate Lyrics & Translations
      </Button>
    </div>
  )
}
export default GenerateLyricsButton
