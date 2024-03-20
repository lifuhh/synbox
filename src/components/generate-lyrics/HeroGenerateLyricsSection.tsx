import { useAppContext } from '@/context/AppContext'
import { useState } from 'react'
import HeroGenerateLyricsDefault from './HeroGenerateLyricsDefault'

const HeroGenerateLyricsSection = () => {
  const { processingStage, setProcessingStage } = useAppContext()
  const [loading, setLoading] = useState(false)

  let heroContent
  if (processingStage === 0) {
    heroContent = (
      <HeroGenerateLyricsDefault loading={loading} setLoading={setLoading} />
    )
  }

  return <section className='px-4 mt-14'>{heroContent}</section>
}
export default HeroGenerateLyricsSection
