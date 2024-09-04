import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { dialogStepAtom, videoDataAtom } from '@/context/atoms'
import { useStreamValidationApi } from '@/hooks/useStreamValidationApi'
import { Loader, Paper, Text } from '@mantine/core'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useAtom, useSetAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import RequestDialogAnnotateDisplay from './RequestDialogAnnotateDisplay'
import RequestDialogStepTwoDisplay from './RequestDialogStepTwoDisplay'
import RequestDialogValidationDisplay from './RequestDialogValidationDisplay'

interface RequestDialogProps {
  videoId: string
  handleClose: () => void
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  videoId,
  handleClose,
}) => {
  const [currentStep, setCurrentStep] = useAtom(dialogStepAtom)
  const setVideoData = useSetAtom(videoDataAtom)
  const [showLoader, setShowLoader] = useState(false)
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
  }, [videoId])

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
  }, [])

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
        return <RequestDialogStepTwoDisplay vidInfo={vidInfo} />
      case 2:
        return (
          <RequestDialogAnnotateDisplay
            id={videoId}
            lyrics={vidInfo?.lyrics || []}
            timestampedLyrics={vidInfo?.timestamped_lyrics || []}
          />
        )
      case 3:
        return (
          <div className='mt-4'>
            <h3 className='text-xl font-bold'>Final Step</h3>
            <p>This is the final step component.</p>
            {/* Add your new component or content for the final step here */}
          </div>
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
          <div className='mt-4 text-red-500'>
            <h3 className='text-xl font-bold'>Error</h3>
            <p>{error}</p>
          </div>
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
            {currentStep === 3 ? 'Finish' : 'Proceed to Next Step'}
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
