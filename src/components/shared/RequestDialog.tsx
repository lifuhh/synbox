import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useStreamingApi } from '@/hooks/useStreamApi'
import { Loader, Paper, Text } from '@mantine/core'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useEffect } from 'react'
import { Button } from '../ui/button'

interface RequestDialogProps {
  videoId: string
  handleClose: () => void
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  videoId,
  handleClose,
}) => {
  const { isStreaming, updateMessages, resetStream } = useStreamingApi(videoId)

  useEffect(() => {
    console.log('RequestDialog: videoId changed, resetting stream')
    resetStream()
  }, [videoId, resetStream])

  useEffect(() => {
    console.log('RequestDialog: Streaming state changed:', isStreaming)
  }, [isStreaming])

  useEffect(() => {
    console.log('RequestDialog: Update messages changed:', updateMessages)
  }, [updateMessages])

  console.log('RequestDialog rendering, isStreaming:', isStreaming)

  return (
    <DialogContent
      className='invisible-ring border-2 border-cyan-500 border-opacity-60 bg-primary-600 sm:max-w-4xl'
      onEscapeKeyDown={handleClose}
      onPointerDownOutside={undefined}
      onInteractOutside={undefined}>
      <DialogHeader>
        <DialogTitle>Request</DialogTitle>
        <DialogDescription>Dialog Desc</DialogDescription>
      </DialogHeader>

      <div className='flex-between m-4 flex flex-col items-center'>
        <Text size='xl'>Video ID: {videoId}</Text>
        {isStreaming && <Loader color='violet' type='dots' />}
        {updateMessages.map((message, index) => (
          <Paper key={index} className='m-2 p-4'>
            <Text size='sm'>{message}</Text>
          </Paper>
        ))}
      </div>
      <DialogFooter>
        <Button
          type='button'
          variant='default'
          onClick={handleClose}
          className=' invisible-ring text-md text-light-1 hover:border-primary hover:bg-light-1 hover:text-primary hover:outline-1'>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
export default RequestDialog
