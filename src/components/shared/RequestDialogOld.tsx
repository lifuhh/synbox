import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { videoDataAtom } from '@/context/atoms'
import { useStreamValidationApi } from '@/hooks/useStreamValidationApi'
import { Loader, Paper, Text } from '@mantine/core'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useSetAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import RequestDialogValidationDisplay from './RequestDialogValidationDisplay'

interface RequestDialogProps {
  videoId: string
  handleClose: () => void
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  videoId,
  handleClose,
}) => {
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
        )}
      </div>

      <DialogFooter>
        {showVidInfo && (
          <Button
            onClick={() => {}}
            className='mt-4 bg-blue-500 text-white hover:bg-blue-600'>
            Proceed to Next Step
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
