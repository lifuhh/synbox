import RequestDialog from '@/components/shared/RequestDialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Divider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const TestRequestPage = () => {
  const [dialogOpen, setDialogStatus] = useState(false)
  const [loaderVisible, loaderVisibilityHandler] = useDisclosure(false)

  const handleOpenOverlay = () => {
    setDialogStatus(true)
    loaderVisibilityHandler.open()
  }

  return (
    <div className='mt-14 flex w-full flex-col'>
      <Helmet>
        <title>Request Test Page | Synbox</title>
      </Helmet>
      <div className='flex-between min-w-screen mx-auto mt-20 '>
        <Dialog open={dialogOpen}>
          <DialogTrigger asChild>
            <div className='flex flex-col'>
              <Button variant={'default'} onClick={handleOpenOverlay}>
                Test
              </Button>
              <Divider my='xl' />
              <div className='flex flex-col gap-4'>
                <Button variant={'default'}>Default</Button>
                <Button variant={'secondary'}>Secondary</Button>
                <Button variant={'destructive'}>Destructive</Button>
                <Button variant={'outline'}>Outline</Button>
                <Button variant={'ghost'}>Ghost</Button>
                <Button variant={'link'}>Link</Button>
              </div>
            </div>
          </DialogTrigger>
          <RequestDialog
            setDialogStatus={setDialogStatus}
            loaderVisible={loaderVisible}
            loaderVisibilityHandler={loaderVisibilityHandler}
          />
        </Dialog>
      </div>
    </div>
  )
}
export default TestRequestPage
