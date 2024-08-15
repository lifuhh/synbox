import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Divider, Loader, Paper, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

import { streamResultAtom } from '@/context/atoms'
import { validateJSON } from '@/utils'
import { useAtomValue } from 'jotai/react'

interface RequestDialogProps {
  videoId: string
  setDialogOpen: (open: boolean) => void
  loaderVisible: boolean
  loaderVisibilityHandler: {
    open: () => void
    close: () => void
    toggle: () => void
  }
}

interface StreamMessageProps {
  type: string
  data: string | object
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  videoId,
  setDialogOpen,
}) => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamMessages, setStreamMessages] = useState<StreamMessageProps[]>([])
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [accumulatedMessages, setAccumulatedMessages] = useState<
    StreamMessageProps[]
  >([])
  useEffect(() => {
    // Reset states when videoId changes
    setIsStreaming(false)
    setStreamMessages([])
    setUpdateMessages([])
    let isCancelled = false // Used to cancel the fetch when videoId changes

    if (!videoId || isStreaming) return

    setIsStreaming(true)

    const handleDialogOpen = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/test`, {
          method: 'POST',
          body: JSON.stringify({ videoId }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error('Network response was not ok')
        if (!response.body)
          throw new Error('ReadableStream not yet supported in this browser')
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          if (isCancelled) {
            reader.cancel()
            break
          }

          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          lines.forEach((line) => {
            if (validateJSON(line)) {
              const content = JSON.parse(line)

              if (content['type'] == 'update' || content['type'] == 'data') {
                setUpdateMessages((prev) => [...prev, content['data']])
              }
            }
          })
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Error:', error)
        }
      } finally {
        if (!isCancelled) {
          setIsStreaming(false)
        }
      }
    }

    handleDialogOpen()

    // Cleanup function to cancel the fetch if videoId changes or component unmounts
    return () => {
      isCancelled = true
      setIsStreaming(false)
    }
  }, [videoId, isStreaming])

  const handleClose = () => {
    setDialogOpen(false)
  }

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
        {updateMessages.map((message, index) => (
          <Paper key={index} className='m-2 p-4'>
            <Text size='sm'>{message}</Text>
          </Paper>
        ))}
        {isStreaming && <Loader color='red' type='dots' />}
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
