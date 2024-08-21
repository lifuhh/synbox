import HeroGenerateLyricsSection from '@/components/generate-lyrics/HeroGenerateLyricsSection'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HoverTranslateText from '@/components/landing-page/HoverTranslateText'
import PopularSongsTable from '@/components/landing-page/PopularSongsTable'
import PricingTable from '@/components/landing-page/PricingTable'
import SongHighlightCarousel from '@/components/landing-page/SongHighlightCarousel'
import SongsInfiniteGallery from '@/components/landing-page/SongsInfiniteGallery'
import { Helmet } from 'react-helmet-async'

import { Divider } from '@mantine/core'

const LandingPage = () => {
  return (
    //* <!-- This is the main container for the landing page -->
    <section className='custom-scrollbar flex flex-1 flex-col overflow-y-scroll md:px-10'>
      <Helmet>
        <title>Synbox</title>
        <meta name='Synbox Homepage' content='Synbox - AI Powered Karaoke' />
      </Helmet>
      {/* //? This is the song URL input area >> convert to component */}
      <HeroGenerateLyricsSection />
      {/* <Divider
        my='xs'
        label={
          <HoverTranslateText text='おすすめ' revealText='Recommendations' />
        }
        labelPosition='center'
        className='p-4'
      /> */}
      {/* //TODO: Figure out how to do the mouseover to reveal different text */}
      <Divider
        my='xs'
        label={
          <h1 className='font_noto_sans_jp_black_900 pointer-events-none text-2xl font-bold text-light-2'>
            おすすめ
          </h1>
        }
        labelPosition='center'
        className=' p-4'
      />
      <section className='flex w-full flex-col gap-4 lg:flex-row '>
        {/* //? Song Carousel */}
        <SongHighlightCarousel />

        {/* //? Songs Top 50 Leaderboard */}
        <PopularSongsTable />
      </section>
      <Divider
        my='xs'
        label={
          <h1 className='pointer-events-none text-2xl font-bold text-light-2'>
            Pricing
          </h1>
        }
        labelPosition='center'
        className='p-4'
      />
      {/* //? Pricing */}
      <PricingTable />
      {/* //TODO: Payment stuff Component */}
      <Divider
        my='xs'
        label={
          <h1 className='pointer-events-none text-2xl font-bold text-light-2'>
            Gallery
          </h1>
        }
        labelPosition='center'
        className='p-4'
      />
      {/* //? Infinite Gallery */}
      <SongsInfiniteGallery />
      {/* //? Footer with tech used & personal links */}
    </section>
  )
}
export default LandingPage
