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
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import RequestDialogAnnotateDisplay from './RequestDialogAnnotateDisplay'
import RequestDialogStepTwoDisplay from './RequestDialogStepTwoDisplay'
import RequestDialogUploadDisplay from './RequestDialogUploadDisplay'
import RequestDialogValidationDisplay from './RequestDialogValidationDisplay'
import UpdateMessagesDisplay from './UpdateMessagesDisplay'

interface RequestDialogProps {
  videoId: string
  handleClose: () => void
}

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>

const RequestDialog = ({ videoId, handleClose }: RequestDialogProps) => {
  const [currentStep, setCurrentStep] = useAtom(dialogStepAtom)
  const [showLoader, setShowLoader] = useState(false)
  const [lyrics, setLyrics] = useState<string[]>([])
  const [timestampedLyrics, setTimestampedLyrics] = useState<unknown[]>([])
  const [engTranslation, setEngTranslation] = useState<string[]>([])
  const [chiTranslation, setChiTranslation] = useState<string[]>([])
  const [romajiLyrics, setRomajiLyrics] = useState<string[]>([])
  const [kanjiAnnotations, setKanjiAnnotations] = useState<string[]>([])
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

  useEffect(() => {
    if (videoId) {
      mutate(videoId)
    }
    // Clean up function to reset the stream when the component unmounts
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
      return () => clearTimeout(timer)
    }
  }, [vidInfo, error, setShowVidInfo])
  const getDialogHeaderContent = () => {
    switch (currentStep) {
      case 0:
        return {
          title: 'Step 1 - Validation',
          description: '',
        }
      case 1:
        return {
          title: 'Step 2 - Transcription',
          description: '',
        }
      case 2:
        return {
          title: 'Step 3 - Translation & Annotation',
          description: '',
        }
      case 3:
        return {
          title: 'Step 4 - Confirmation',
          description: '',
        }
      default:
        return {
          title: 'Complete',
          description: '',
        }
    }
  }

  const { title, description } = getDialogHeaderContent()

  const handlePreviousClick = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }

  const handleProceedClick = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    event.preventDefault()
  }

  const handlePointerDownOutside = (event: PointerDownOutsideEvent) => {
    event.preventDefault()
  }

  const handleInteractOutside = (event: SyntheticEvent) => {
    event.preventDefault()
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
            {showVidInfo && !showLoader && !error && (
              <RequestDialogValidationDisplay vidInfo={vidInfo} />
            )}
          </>
        )
      case 1:
        return (
          <RequestDialogStepTwoDisplay
            vidInfo={vidInfo}
            onLyricsUpdate={handleLyricsUpdate}
          />
        )
      case 2:
        return (
          <RequestDialogAnnotateDisplay
            id={videoId}
            lyrics={lyrics}
            timestampedLyrics={timestampedLyrics}
            onAnnotationsUpdate={handleAnnotationsUpdate}
          />
        )
      case 3:
        return (
          <RequestDialogUploadDisplay
            id={videoId}
            lyrics={lyrics}
            timestampedLyrics={timestampedLyrics}
            engTranslation={engTranslation}
            chiTranslation={chiTranslation}
            romajiLyrics={romajiLyrics}
            kanjiAnnotations={kanjiAnnotations}
          />
        )
      default:
        return null
    }
  }

  return (
    <DialogContent
      className='invisible-ring flex h-auto max-h-[90vh] flex-col border-2 border-cyan-500 border-opacity-60 bg-primary-600 sm:max-w-2xl'
      onEscapeKeyDown={handleEscapeKeyDown}
      onPointerDownOutside={handlePointerDownOutside}
      onInteractOutside={handleInteractOutside}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className='mx-4 my-2 flex-grow overflow-y-auto'>
        {renderStep()}
        {error && (
          <div className='mt-4 text-red-500'>
            <h3 className='text-xl font-bold'>Error</h3>
            <p>{error}</p>
          </div>
        )}
      </div>

      <DialogFooter className='sm:flex-between flex w-full justify-start bg-primary-600 p-4'>
        <DialogClose asChild>
          <Button
            type='button'
            variant='secondary'
            onClick={handleClose}
            disabled={isStreaming}
            className='invisible-ring text-md text-light-1 hover:border-primary hover:bg-light-1 hover:text-primary hover:outline-1'>
            Close
          </Button>
        </DialogClose>

        <div>
          {currentStep > 0 && (
            <Button
              onClick={handlePreviousClick}
              className='invisible-ring mr-2 bg-gray-500 text-white hover:bg-gray-600'>
              Previous Step
            </Button>
          )}
          {((showVidInfo && currentStep === 0) ||
            (currentStep > 0 && currentStep < 3)) && (
            <Button
              onClick={handleProceedClick}
              className='invisible-ring bg-blue-500 text-white hover:bg-blue-600'>
              {currentStep === 2 ? 'Upload Lyrics' : 'Next Step'}
            </Button>
          )}
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

export default RequestDialog
