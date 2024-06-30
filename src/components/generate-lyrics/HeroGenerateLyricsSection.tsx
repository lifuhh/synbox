import HeroGenerateLyricsError from '@/components/generate-lyrics/HeroGenerateLyricsError'
import HeroGenerateLyricsExists from '@/components/generate-lyrics/HeroGenerateLyricsExists'

import { useAppContext } from '@/context/AppContext'

import { useState } from 'react'
import HeroGenerateLyricsDefault from './HeroGenerateLyricsDefault'
import HeroGenerateLyricsProcessing from './HeroGenerateLyricsProcessing'

const exist = 'K1Tz2yNmamI'
const noExist = 'qDL3zhB8-MM'

const HeroGenerateLyricsSection = () => {
  const { processingStage, setProcessingStage } = useAppContext()
  const [inputVideoId, setInputVideoId] = useState<string>('')

  const [subStage, setSubStage] = useState<number>(1)

  const renderComponent = () => {
    switch (processingStage) {
      case 1:
        return (
          <HeroGenerateLyricsDefault
            setProcessingStage={setProcessingStage}
            setInputVideoId={setInputVideoId}
          />
        )
      case 2:
        return <HeroGenerateLyricsProcessing subStage={subStage} />
      case 200:
        return <HeroGenerateLyricsExists />
      case 404:
        return <HeroGenerateLyricsError />
    }
  }

  return (
    <>
      <section className='mt-14 px-4'>{renderComponent()}</section>
    </>
  )
}
export default HeroGenerateLyricsSection
