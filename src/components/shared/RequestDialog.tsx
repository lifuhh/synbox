import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { dialogStepAtom } from '@/context/atoms'
import { useStreamValidationApi } from '@/hooks/useStreamValidationApi'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import RequestDialogAnnotateDisplay from './RequestDialogAnnotateDisplay'
import RequestDialogFinalDisplay from './RequestDialogFinalDisplay'
import RequestDialogStepTwoDisplay from './RequestDialogStepTwoDisplay'
import RequestDialogValidationDisplay from './RequestDialogValidationDisplay'
import UpdateMessagesDisplay from './UpdateMessagesDisplay'

import {
  useGetLyricsBySongId,
  useUploadLyricsToAppwrite,
} from '@/lib/react-query/queriesAndMutations'
import { QUERY_KEYS } from '@/lib/react-query/queryKeys'
import { useQueryClient } from '@tanstack/react-query'

interface RequestDialogProps {
  videoId: string
  handleClose: () => void
}

type OutsideEvent = CustomEvent<{ originalEvent: PointerEvent | FocusEvent }>

const RequestDialog = ({ videoId, handleClose }: RequestDialogProps) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useAtom(dialogStepAtom)
  const [showLoader, setShowLoader] = useState(false)
  const [lyrics, setLyrics] = useState<string[]>([])
  const [annotateError, setAnnotateError] = useState<string | null>(null)
  const [timestampedLyrics, setTimestampedLyrics] = useState<unknown[]>([])
  const [engTranslation, setEngTranslation] = useState<string[]>([])
  const [chiTranslation, setChiTranslation] = useState<string[]>([])
  const [romajiLyrics, setRomajiLyrics] = useState<string[]>([])
  const [kanjiAnnotations, setKanjiAnnotations] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [isTranscriptionStreaming, setIsTranscriptionStreaming] =
    useState(false)
  const [isAnnotationStreaming, setIsAnnotationStreaming] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const {
    isStreaming,
    updateMessages,
    vidInfo,
    showVidInfo,
    setShowVidInfo,
    error,
    resetStream,
    mutate,
  } = useStreamValidationApi()

  const queryClient = useQueryClient()
  const { mutate: uploadLyricsToAppwrite } = useUploadLyricsToAppwrite()
  const { refetch: refetchLyrics } = useGetLyricsBySongId(videoId)

  const isButtonDisabled =
    isStreaming ||
    isUploading ||
    showLoader ||
    isAnnotationStreaming ||
    isTranscriptionStreaming

  const handleAnnotateError = (error: string) => {
    setAnnotateError(error)
  }

  const handleStreamingStatusChange = (status) => {
    setIsAnnotationStreaming(status)
  }

  const handleTranscriptionStreamingChange = (status: boolean) => {
    setIsTranscriptionStreaming(status)
  }

  useEffect(() => {
    if (videoId) {
      mutate(videoId)
    }
    return () => {
      resetStream()
    }
  }, [videoId, mutate, resetStream])

  useEffect(() => {
    if (isStreaming) {
      setShowLoader(true)
    } else {
      const timer = setTimeout(() => setShowLoader(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isStreaming])

  useEffect(() => {
    if (vidInfo && !error) {
      const timer = setTimeout(() => setShowVidInfo(true), 1000)
      // console.log('vid info is')
      // console.log(vidInfo)
      return () => clearTimeout(timer)
    }
  }, [vidInfo, error, setShowVidInfo])

  const getDialogHeaderContent = () => {
    switch (currentStep) {
      case 0:
        return { title: 'Step 1 - Validation', description: '' }
      case 1:
        return { title: 'Step 2 - Transcription', description: '' }
      case 2:
        return { title: 'Step 3 - Translation & Annotation', description: '' }
      case 3:
        return { title: 'Upload Complete', description: 'Enjoy the video!' }
      default:
        return {
          title: 'Transcription Completed',
          description: 'Enjoy the video!',
        }
    }
  }

  const { title, description } = getDialogHeaderContent()

  const handlePreviousClick = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }

  const handleLyricsUpdate = (
    newLyrics: string[],
    newTimestampedLyrics: unknown[],
  ) => {
    setLyrics(newLyrics)
    setTimestampedLyrics(newTimestampedLyrics)
  }

  const handleAnnotationsUpdate = (
    newEngTranslation: string[],
    newChiTranslation: string[],
    newRomajiLyrics: string[],
    newKanjiAnnotations: string[],
  ) => {
    setEngTranslation(newEngTranslation)
    setChiTranslation(newChiTranslation)
    setRomajiLyrics(newRomajiLyrics)
    setKanjiAnnotations(newKanjiAnnotations)
  }

  const handleUpload = async () => {
    setIsUploading(true)
    setUploadError(null)

    if (!Array.isArray(timestampedLyrics) || timestampedLyrics.length === 0) {
      setUploadError('Timestamped lyrics are missing or invalid')
      setIsUploading(false)
      return
    }

    try {
      const formatTime = (seconds: number): string => {
        const pad = (num: number) => num.toString().padStart(2, '0')
        const roundedSeconds = Math.round(seconds * 1000) / 1000
        const hours = Math.floor(roundedSeconds / 3600)
        const minutes = Math.floor((roundedSeconds % 3600) / 60)
        const secs = Math.floor(roundedSeconds % 60)
        const milliseconds = Math.floor((roundedSeconds % 1) * 1000)
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${milliseconds.toString().padStart(3, '0')}`
      }

      const convertToRuby = (annotatedLine: string) => {
        const rubyLines = annotatedLine.replace(
          /([一-龯々]+)\[([^\]]+)\]/g,
          (match, kanji, reading) => {
            return `<ruby>${kanji}<rp>(</rp><rt>${reading}</rt><rp>)</rp></ruby>`
          },
        )
        return rubyLines.replace(/\[[^\]]+\]/g, '')
      }

      const adjustedTimestampedLyrics = timestampedLyrics.map(
        (item: any, index) => ({
          id: (index + 1).toString(),
          startTime: formatTime(item.start_time),
          startSeconds: item.start_time,
          endTime: formatTime(item.end_time),
          endSeconds: item.end_time,
          text: item.lyric,
        }),
      )

      const labelledLyrics = adjustedTimestampedLyrics.map((item, index) => ({
        ...item,
        text: convertToRuby(kanjiAnnotations[index] || item.text),
      }))

      const lyricsData = {
        full_lyrics: JSON.stringify(adjustedTimestampedLyrics),
        plain_lyrics: JSON.stringify(lyrics),
        romaji: JSON.stringify(romajiLyrics),
        eng_translation: JSON.stringify(engTranslation),
        chi_translation: JSON.stringify(chiTranslation),
        labelled_full_lyrics: JSON.stringify(labelledLyrics),
      }

      await uploadLyricsToAppwrite(
        { songId: videoId, lyricsData },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.GET_LYRICS_BY_SONG_ID, videoId],
            })
            await new Promise((resolve) => setTimeout(resolve, 5000))
            await refetchLyrics()
            setIsUploading(false)
            setUploadSuccess(true)
            setCurrentStep(3) // Move to the final step
          },
          onError: (error: any) => {
            setIsUploading(false)
            setUploadError('Upload failed: ' + error.message)
            console.error('Upload failed:', error)
          },
        },
      )
    } catch (err: any) {
      setIsUploading(false)
      setUploadError(
        'An error occurred while processing the data: ' + err.message,
      )
      console.error('Error processing data:', err)
    }
  }

  const handleProceedClick = () => {
    if (currentStep === 2) {
      handleUpload()
    } else {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  // Reset states when dialog closes
  const resetStates = () => {
    setCurrentStep(0)
    setShowLoader(false)
    setLyrics([])
    setAnnotateError(null)
    setTimestampedLyrics([])
    setEngTranslation([])
    setChiTranslation([])
    setRomajiLyrics([])
    setKanjiAnnotations([])
    setIsUploading(false)
    setUploadSuccess(false)
    setIsAnnotationStreaming(false)
    setUploadError(null)
    resetStream()
  }

  const handleCloseWithReset = () => {
    if (!isButtonDisabled) {
      resetStates()
      handleClose()
    }
  }

  // Handle all closing events
  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    event.preventDefault()
    if (!isButtonDisabled) {
      handleCloseWithReset()
    }
  }

  const handleOutsideEvent = (event: OutsideEvent) => {
    event.preventDefault()
    if (!isButtonDisabled) {
      handleCloseWithReset()
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <UpdateMessagesDisplay
              isStreaming={isStreaming}
              showLoader={showLoader}
              updateMessages={updateMessages}
            />
            {showVidInfo && !showLoader && !error && vidInfo && (
              <RequestDialogValidationDisplay vidInfo={vidInfo} />
            )}
          </>
        )
      case 1:
        return (
          <RequestDialogStepTwoDisplay
            vidInfo={vidInfo}
            onLyricsUpdate={handleLyricsUpdate}
            onStreamingStatusChange={handleTranscriptionStreamingChange}
          />
        )
      case 2:
        return isUploading ? (
          <UpdateMessagesDisplay
            isStreaming={true}
            showLoader={true}
            updateMessages={['Finalizing...']}
          />
        ) : (
          <RequestDialogAnnotateDisplay
            id={videoId}
            lyrics={lyrics}
            timestampedLyrics={timestampedLyrics}
            onAnnotationsUpdate={handleAnnotationsUpdate}
            onError={handleAnnotateError}
            onStreamingStatusChange={handleStreamingStatusChange}
          />
        )
      case 3:
        return vidInfo && <RequestDialogFinalDisplay vidInfo={vidInfo} />
      default:
        return null
    }
  }

  return (
    <DialogContent
      className='invisible-ring border-1 flex h-auto max-h-[90vh] flex-col border-accent border-opacity-60 bg-background sm:max-w-2xl [&>button]:hidden'
      onEscapeKeyDown={handleEscapeKeyDown}
      onPointerDownOutside={handleOutsideEvent}
      onInteractOutside={handleOutsideEvent}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className='mx-4 mt-2 flex-grow overflow-y-auto'>
        {renderStep()}
        {(error || annotateError) && (
          <div className='mt-4 text-primary-bright'>
            <h3 className='text-xl font-bold'>Error</h3>
            <p>{error || annotateError}</p>
          </div>
        )}
      </div>

      {currentStep !== 3 && (
        <DialogFooter className='bg-primary-600 flex w-full flex-col-reverse gap-4 p-4 md:flex-row md:justify-between'>
          <DialogClose asChild disabled={isButtonDisabled}>
            <Button
              type='button'
              variant='ghost'
              onClick={handleCloseWithReset}
              disabled={isButtonDisabled}
              className='invisible-ring text-md text-light-1 w-full disabled:bg-gray-600 md:w-auto'>
              Close
            </Button>
          </DialogClose>

          {!error && !annotateError && currentStep < 3 && !isButtonDisabled && (
            <div className='flex w-full justify-between gap-2 px-2 md:w-auto md:justify-end'>
              {currentStep > 0 && (
                <Button
                  onClick={handlePreviousClick}
                  disabled={isButtonDisabled}
                  className='invisible-ring flex-1 bg-gray-500 text-white hover:bg-gray-600 md:flex-initial'>
                  Previous Step
                </Button>
              )}
              {((showVidInfo && currentStep === 0) || currentStep > 0) && (
                <Button
                  onClick={handleProceedClick}
                  disabled={isButtonDisabled}
                  className='invisible-ring flex-1 text-white md:flex-initial'>
                  {currentStep === 2 ? 'Proceed' : 'Next Step'}
                </Button>
              )}
            </div>
          )}
        </DialogFooter>
      )}
    </DialogContent>
  )
}

export default RequestDialog
