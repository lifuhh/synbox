import GenerateLyricsInput from '@/components/landing-page/GenerateLyricsInput'
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
      <GenerateLyricsInput />
      <Divider my='sm' />
      {/* //? This is the Carousel + Leaderboard (placeholder) */}
      <section className='highlights w-full flex flex-col sm:flex-row gap-2 lg:gap-8 space-between lg:p-0'>
        <SongHighlightCarousel />
        <PopularSongsTable />
      </section>
      <Divider
        my='md'
        label={<h1 className='text-xl text-white'>Songs Gallery</h1>}
        labelPosition='center'
        className='p-4'
      />
      <SongsInfiniteGallery />
      <BottomBar />
    </section>
  )
}
export default LandingPage
