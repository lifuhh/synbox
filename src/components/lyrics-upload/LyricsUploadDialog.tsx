import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadedSrtLine } from '@/types'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import LyricsUploadStageOne from './LyricsUploadStageOne'
import LyricsUploadStageThree from './LyricsUploadStageThree'
import LyricsUploadStageTwo from './LyricsUploadStageTwo'

//* This component should manage the state and decide what to display
const LyricsUploadDialog = () => {
  const [lyricsUploadPhase, setLyricsUploadPhase] = useState<number>(0)

  const [mainParsedSrt, setMainParsedSrt] = useState<UploadedSrtLine[]>([])
  const [mainParsedRomaji, setMainParsedRomaji] = useState<string[]>([])
  const [bothFilesUploaded, setBothFilesUploaded] = useState<boolean>(false)
  const [bothFilesNames, setBothFilesNames] = useState<string[]>([])

  const [stageTwoLyrics, setStageTwoLyrics] = useState<{
    [key: string]: string
  }>({})

  const handlePreviousStep = () => {
    setLyricsUploadPhase((prevPhase) => prevPhase - 1)
  }

  const handleNextStep = () => {
    setLyricsUploadPhase((prevPhase) => prevPhase + 1)
  }

  let currentMainComponent, currentMainButton, currentDescription

  if (lyricsUploadPhase === 0) {
    currentMainComponent = (
      <LyricsUploadStageOne
        mainParsedSrt={mainParsedSrt}
        mainParsedRomaji={mainParsedRomaji}
        bothFilesUploaded={bothFilesUploaded}
        bothFilesNames={bothFilesNames}
        setMainParsedSrt={setMainParsedSrt}
        setMainParsedRomaji={setMainParsedRomaji}
        setBothFilesUploaded={setBothFilesUploaded}
        setBothFilesNames={setBothFilesNames}
      />
    )
    currentMainButton = (
      <Button onClick={handleNextStep} disabled={!bothFilesUploaded}>
        Next
      </Button>
    )

    currentDescription =
      'Upload a pair of lyrics (.srt) and romaji (.txt) files for processing'
  } else if (lyricsUploadPhase === 1) {
    currentMainComponent = (
      <LyricsUploadStageTwo
        mainParsedRomaji={mainParsedRomaji}
        mainParsedSrt={mainParsedSrt}
        setStageTwoLyrics={setStageTwoLyrics}
      />
    )
    currentMainButton = <Button onClick={handleNextStep}>Next</Button>

    currentDescription = 'Check the lyrics against the romaji before proceeding'
  } else if (lyricsUploadPhase === 2) {
    currentMainComponent = (
      <LyricsUploadStageThree stageTwoLyrics={stageTwoLyrics} />
    )
    currentMainButton = (
      <Button
        onClick={() => {}}
        // disabled={!srtUploaded || !txtUploaded}
      >
        Upload Lyrics
      </Button>
    )
    currentDescription =
      'Perform a final check on the generated lyrics code before uploading'
  }

  return (
    <>
      <DialogContent className='h-2/3'>
        <DialogHeader>
          <DialogTitle>
            Upload Lyrics (Part {lyricsUploadPhase + 1})
          </DialogTitle>
          <DialogDescription>{currentDescription}</DialogDescription>
        </DialogHeader>
        {currentMainComponent}
        <DialogFooter>
          {lyricsUploadPhase == 0 ? (
            ''
          ) : (
            <Button onClick={handlePreviousStep}>Previous Step</Button>
          )}
          {currentMainButton}
        </DialogFooter>
      </DialogContent>
    </>
  )
}
export default LyricsUploadDialog
