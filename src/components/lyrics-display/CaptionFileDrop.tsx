import { UploadedSrtLine } from '@/types'
import { parseRomajiFile, parseSrt, trimLength } from '@/utils'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

interface LyricsUploadStageOneProps {
  bothFilesUploaded: boolean
  mainParsedSrt: UploadedSrtLine[]
  mainParsedRomaji: string[]
  bothFilesNames: string[]
  setBothFilesUploaded: (bothFilesUploaded: boolean) => void
  setMainParsedSrt: (parsedSrt: UploadedSrtLine[]) => void
  setMainParsedRomaji: (parsedRomaji: string[]) => void
  setBothFilesNames: (bothFilesNames: string[]) => void
}

const LyricsUploadStageOne: React.FC<LyricsUploadStageOneProps> = ({
  bothFilesUploaded,
  bothFilesNames,
  mainParsedSrt,
  mainParsedRomaji,
  setBothFilesUploaded,
  setMainParsedSrt,
  setMainParsedRomaji,
  setBothFilesNames,
}) => {
  const [currentParsedSrt, setCurrentParsedSrt] =
    useState<UploadedSrtLine[]>(mainParsedSrt)
  const [currentParsedRomaji, setCurrentParsedRomaji] =
    useState<string[]>(mainParsedRomaji)

  const [txtUploaded, setTxtUploaded] = useState<boolean>(false)
  const [txtFileName, setTxtFileName] = useState<string>('')
  const [srtUploaded, setSrtUploaded] = useState<boolean>(false)
  const [srtFileName, setSrtFileName] = useState<string>('')

  useEffect(() => {
    if (bothFilesUploaded) {
      setSrtFileName(bothFilesNames[0])
      setTxtFileName(bothFilesNames[1])
      setSrtUploaded(true)
      setTxtUploaded(true)
    }
  }, [bothFilesUploaded, bothFilesNames])

  useEffect(() => {
    if (srtUploaded && txtUploaded) {
      // Your validation logic here
      const srtSize = currentParsedSrt.length
      const txtSize = currentParsedRomaji.length

      if (srtSize !== txtSize) {
        // console.log('Srt and txt file sizes do not match')
      }

      setMainParsedSrt(currentParsedSrt)
      setMainParsedRomaji(currentParsedRomaji)
      setBothFilesUploaded(true)
      setBothFilesNames([srtFileName, txtFileName])
    }
  }, [
    srtUploaded,
    txtUploaded,
    currentParsedRomaji,
    currentParsedSrt,
    setMainParsedSrt,
    setMainParsedRomaji,
    setBothFilesUploaded,
    setBothFilesNames,
    srtFileName,
    txtFileName,
  ])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const fileName = file.name
      const extension = fileName.split('.').pop()
      const trimmedFileName = trimLength(fileName, 30, true)

      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = (e) => {
        const content = (e.target as FileReader).result as string
        //* Process srt and txt differently
        if (extension == 'srt') {
          const parsedContent = parseSrt(content)
          setSrtUploaded(true)
          setCurrentParsedSrt(parsedContent)
          setSrtFileName(trimmedFileName)
        } else if (extension == 'txt') {
          const parsedContent = parseRomajiFile(content)
          setTxtUploaded(true)
          setCurrentParsedRomaji(parsedContent)
          setTxtFileName(trimmedFileName)
        }
      }
      reader.readAsText(file)
    }, [])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      'text/srt': ['.srt'],
      'text/txt': ['.txt'],
    },
  })

  const removeSrtFile = () => {
    setSrtUploaded(false)
    setSrtFileName('')
    setCurrentParsedSrt([])
    setBothFilesNames([])
    setBothFilesUploaded(false)
    setMainParsedSrt([])
  }

  const removeTxtFile = () => {
    setTxtUploaded(false)
    setTxtFileName('')
    setCurrentParsedRomaji([])
    setBothFilesNames([])
    setBothFilesUploaded(false)
    setMainParsedRomaji([])
  }

  // const generateListOfUploadedFiles = (files: FileWithPath[]): ReactNode =>
  //   files.map((file) => (
  //     <div>
  //       <li key={file.path}>
  //         {file.path} - {file.size} bytes
  //       </li>
  //       <button onClick={() => removeFile(file.name)}>Remove</button>
  //     </div>
  //   ))

  // const removeFile = (name: string) => {
  //   setFiles((previousFiles) =>
  //     previousFiles.filter((file) => file.name !== name)
  //   )
  // }

  return (
    <div className='h-72 border-4 border-slate-800'>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='h-48 cursor-pointer border-4 border-dark-4'>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className='text-center'>
            Drop the song's lyrics (.srt) file and romaji (.txt) file here
          </p>
        ) : (
          <p className='text-center'>
            Drag 'n' drop lyrics (.srt) and romaji (.txt) file here, or click to
            select them from your device
          </p>
        )}
      </div>
      <div className='min-w-9/10'>
        {srtUploaded ? (
          <div className='flex-between border-2'>
            <div>
              <h1>Srt Uploaded: {srtFileName}</h1>
              <h1>Srt Length: {currentParsedSrt.length}</h1>
            </div>
            <Button
              className='rounded-full'
              size='icon'
              variant='ghost'
              onClick={removeSrtFile}>
              <HighlightOffIcon sx={{ fontSize: 32 }} />
              <span className='sr-only'>Delete Srt Upload</span>
            </Button>
          </div>
        ) : (
          <h1 className='border-2'>Srt Not Uploaded</h1>
        )}
        {txtUploaded ? (
          <div className='flex-between border-2'>
            <div>
              <h1>Txt Uploaded: {txtFileName}</h1>
              <h1>Txt Length: {currentParsedRomaji.length}</h1>
            </div>
            <Button
              className='rounded-full'
              size='icon'
              variant='ghost'
              onClick={removeTxtFile}>
              <HighlightOffIcon sx={{ fontSize: 32 }} />
              <span className='sr-only'>Delete Romaji Upload</span>
            </Button>
          </div>
        ) : (
          <h1 className='border-2'>Txt Not Uploaded</h1>
        )}
      </div>
    </div>
  )
}
export default LyricsUploadStageOne
