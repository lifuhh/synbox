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

import RequestDialogAnnotateDisplay from '@/components/shared/RequestDialogAnnotateDisplay'
import RequestDialogStepTwoDisplay from '@/components/shared/RequestDialogStepTwoDisplay'
import RequestDialogUploadDisplay from '@/components/shared/RequestDialogUploadDisplay'
import RequestDialogValidationDisplay from '@/components/shared/RequestDialogValidationDisplay'
import { Button } from '@/components/ui/button'

const TestDialogPage = () => {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        //! This is Step 1 - Validation Display
        return (
          <>
            {isStreaming && !showLoader && !showVidInfo && (
              <Loader color='yellow' type='dots' />
            )}
            {!showLoader && !showVidInfo && updateMessages.length > 0 && (
              <Paper className='m-2 p-4'>
                <Text size='sm'>
                  {updateMessages[updateMessages.length - 1]}
                </Text>
              </Paper>
            )}
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
        //! This is Step 2 - Transcription Display
        return (
          <RequestDialogStepTwoDisplay
            vidInfo={vidInfo}
            onLyricsUpdate={handleLyricsUpdate}
          />
        )
      case 2:
        //! This is Step 3 - Translation & Annotation Display
        return (
          <RequestDialogAnnotateDisplay
            id={videoId}
            lyrics={lyrics}
            timestampedLyrics={timestampedLyrics}
            onAnnotationsUpdate={handleAnnotationsUpdate}
          />
        )
      case 3:
        //! This is Step 4 - Completion Display
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
    <section className='custom-scrollbar mt-14 flex flex-1 flex-col overflow-y-scroll px-4 md:px-10'>
      <DialogContent
        className='invisible-ring border-2 border-cyan-500 border-opacity-60 bg-primary-600 sm:max-w-4xl'
        onEscapeKeyDown={isStreaming ? undefined : handleClose}
        onPointerDownOutside={isStreaming ? undefined : handleClose}
        onInteractOutside={isStreaming ? undefined : handleClose}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
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
    </section>
  )
}
export default TestDialogPage
