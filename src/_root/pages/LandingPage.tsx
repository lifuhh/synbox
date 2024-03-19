import HeroGenerateLyricsSection from '@/components/landing-page/HeroGenerateLyricsSection'
import PopularSongsTable from '@/components/landing-page/PopularSongsTable'
import SongHighlightCarousel from '@/components/landing-page/SongHighlightCarousel'
import SongsInfiniteGallery from '@/components/landing-page/SongsInfiniteGallery'
import BottomBar from '@/components/shared/BottomBar'

import { Divider } from '@mantine/core'

const LandingPage = () => {
  return (
    //* <!-- This is the main container for the landing page -->
    <section className='overflow-y-scroll flex flex-col flex-1 px-2 md:px-10 custom-scrollbar pt-14'>
      {/* //? This is the song URL input area >> convert to component */}
      <HeroGenerateLyricsSection />
      <Divider
        my='xs'
        label={<h1 className='text-xl text-white'>Featured</h1>}
        labelPosition='center'
        className='p-4'
      />
      {/* //? This is the Carousel + Leaderboard (placeholder) */}
      <section className='w-full flex flex-col lg:flex-row gap-4'>
        <SongHighlightCarousel />
        <PopularSongsTable />
      </section>
      <Divider
        my='xs'
        label={<h1 className='text-xl text-white'>Song Gallery</h1>}
        labelPosition='center'
        className='p-4'
      />
      <SongsInfiniteGallery />
      <BottomBar />
    </section>
  )
}
export default LandingPage
