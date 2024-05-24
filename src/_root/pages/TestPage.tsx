import HeroGenerateLyricsSection from '@/components/generate-lyrics/HeroGenerateLyricsSection'
import { useAppContext } from '@/context/AppContext'
import { Button, Divider } from '@mantine/core'

const TestPage = () => {
  const { processingStage, setProcessingStage } = useAppContext()

  const increaseStage = () => {
    if (processingStage < 4) {
      console.log('Increasing Stage to: ' + (processingStage + 1))
      setProcessingStage(processingStage + 1)
    }
  }

  const decreaseStage = () => {
    if (processingStage > 1) {
      console.log('Decreasing Stage to: ' + (processingStage - 1))
      setProcessingStage(processingStage - 1)
    }
  }

  return (
    <div className='flex-between mx-auto my-auto flex flex-col'>
      <HeroGenerateLyricsSection />
      <Divider my={'xl'} />
      <div className='flex w-full justify-center gap-10'>
        <Button variant='outline' onClick={decreaseStage}>
          Prev
        </Button>
        <Button variant='outline' onClick={increaseStage}>
          Next
        </Button>
      </div>
    </div>
  )
}
export default TestPage
