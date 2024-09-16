import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { dialogStepAtom } from '@/context/atoms'
import { useStreamValidationApi } from '@/hooks/useStreamValidationApi'
import { Loader, Paper, Text } from '@mantine/core'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import RequestDialogAnnotateDisplay from './RequestDialogAnnotateDisplay'
import RequestDialogStepTwoDisplay from './RequestDialogStepTwoDisplay'
import RequestDialogUploadDisplay from './RequestDialogUploadDisplay'
import RequestDialogValidationDisplay from './RequestDialogValidationDisplay'

interface RequestDialogProps {
  videoId: string
  handleClose: () => void
}

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
  }, [videoId, mutate])

  useEffect(() => {
    if (vidInfo) {
      const timer = setTimeout(() => setShowVidInfo(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [vidInfo, setShowVidInfo])

  useEffect(() => {
    return () => {
      console.log('RequestDialog: unmounting, resetting stream')
      resetStream()
    }
  }, [resetStream])

  useEffect(() => {
    if (vidInfo && !showVidInfo) {
      setShowLoader(true)
    } else if (showVidInfo) {
      setShowLoader(false)
    }
  }, [vidInfo, showVidInfo])

  const handleProceedClick = () => {
    setCurrentStep((prevStep) => prevStep + 1)
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
            {isStreaming && !showLoader && !showVidInfo && (
              <Loader color='yellow' type='dots' />
            )}
            {!showLoader &&
              !showVidInfo &&
              updateMessages.map((message, index) => (
                <Paper key={index} className='m-2 p-4'>
                  <Text size='sm'>{message}</Text>
                </Paper>
              ))}
            {showLoader && (
              <div className='my-4'>
                <Loader color='yellow' type='dots' />
              </div>
            )}
            {showVidInfo && (
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
      className='invisible-ring border-2 border-cyan-500 border-opacity-60 bg-primary-600 sm:max-w-4xl'
      onEscapeKeyDown={isStreaming ? undefined : handleClose}
      onPointerDownOutside={isStreaming ? undefined : handleClose}
      onInteractOutside={isStreaming ? undefined : handleClose}>
      <DialogHeader>
        <DialogTitle>Request</DialogTitle>
        <DialogDescription>Dialog Desc</DialogDescription>
      </DialogHeader>

      <div className='flex-between m-4 flex flex-col items-center'>
        <Text size='xl'>Video ID: {videoId}</Text>

        {error ? (
          <>
            <div className='mt-4 text-red-500'>
              <h3 className='text-xl font-bold'>Error</h3>
              <p>{error}</p>
            </div>
            {renderStep()}
          </>
        ) : (
          renderStep()
        )}
      </div>

      <DialogFooter>
        {((showVidInfo && currentStep === 0) ||
          (currentStep > 0 && currentStep < 3)) && (
          <Button
            onClick={handleProceedClick}
            className='invisible-ring bg-blue-500 text-white hover:bg-blue-600'>
            {currentStep === 2 ? 'Proceed to Upload' : 'Proceed to Next Step'}
          </Button>
        )}
        <Button
          type='button'
          variant='default'
          onClick={handleClose}
          disabled={isStreaming}
          className='invisible-ring text-md text-light-1 hover:border-primary hover:bg-light-1 hover:text-primary hover:outline-1'>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default RequestDialog
