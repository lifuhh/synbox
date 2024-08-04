import Loader from '@/components/shared/Loader'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Divider, Paper, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useEffect } from 'react'
import { Button } from '../ui/button'

interface RequestDialogProps {
  setDialogStatus: (open: boolean) => void
  loaderVisible: boolean
  loaderVisibilityHandler: {
    open: () => void
    close: () => void
    toggle: () => void
  }
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  setDialogStatus,
  loaderVisible,
  loaderVisibilityHandler,
}) => {
  const maxDuration = 2000
  const minDuration = 1000

  const handleClose = () => {
    setDialogStatus(false)
  }

  useEffect(() => {
    const randomTimeout =
      Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration

    const timeoutId = setTimeout(() => {
      loaderVisibilityHandler.close()
    }, randomTimeout)

    return () => clearTimeout(timeoutId)
  }, [loaderVisibilityHandler])

  return (
    <DialogContent
      className='invisible-ring border-2 border-cyan-500 border-opacity-60 bg-primary-600 sm:max-w-4xl'
      onEscapeKeyDown={handleClose}
      onPointerDownOutside={undefined}
      onInteractOutside={undefined}>
      <DialogHeader>
        <DialogTitle>Request</DialogTitle>
        <DialogDescription>
          <div className='m-4'>
            <div>
              {loaderVisible ? (
                <Loader color='#55f2cb' />
              ) : (
                <div>
                  <h1>content</h1>
                  <h1>content</h1>
                  <h1>content</h1>
                  <h1>content</h1>
                  <h1>content</h1>
                  <h1>content</h1>
                  <h1>content</h1>
                </div>
              )}
            </div>
          </div>
        </DialogDescription>

        <DialogFooter>
          <Button
            type='button'
            variant='default'
            onClick={handleClose}
            // border-cyan-500 bg-cyan-500
            className=' invisible-ring text-md text-light-1 hover:border-primary hover:bg-light-1 hover:text-primary hover:outline-1'>
            Close
          </Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  )
}
export default RequestDialog
