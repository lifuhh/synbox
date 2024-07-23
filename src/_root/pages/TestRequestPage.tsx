import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { Helmet } from 'react-helmet-async'

const TestRequestPage = () => {
  const handleOpenOverlay = () => {}

  return (
    <div className='mt-14 flex flex-col'>
      <Helmet>
        <title>Request Test Page | Synbox</title>
      </Helmet>

      <div>
        <Button variant={'default'} onClick={handleOpenOverlay}>
          Test
        </Button>
        <div className='m-4'>
          <Loader color='#55f2cb' />
        </div>
      </div>
    </div>
  )
}
export default TestRequestPage
