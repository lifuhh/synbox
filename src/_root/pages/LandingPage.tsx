import HeroGenerateLyricsSection from '@/components/generate-lyrics/HeroGenerateLyricsSection'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HoverTranslateText from '@/components/landing-page/HoverTranslateText'
import LandingPageCharts from '@/components/landing-page/PopularSongsTable'
import SongHighlightCarousel from '@/components/landing-page/SongHighlightCarousel'
import SongsInfiniteGallery from '@/components/landing-page/SongsInfiniteGallery'
import { Divider } from '@mantine/core'
import { Helmet } from 'react-helmet-async'

const LandingPage = () => {
  return (
    //* <!-- This is the main container for the landing page -->
    <section className='anchor-for-top-scroll custom-scrollbar flex flex-1 flex-col overflow-y-scroll md:px-10'>
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
        my='sm'
        label={
          <h1 className='font_noto_sans_jp_black_900 unselectable text-foreground text-2xl font-bold'>
            {/* おすすめ */}
            Recommendations
          </h1>
        }
        labelPosition='center'
        className='px-8 pb-6 pt-2'
      />
      <section className='mx-auto flex w-full flex-col justify-center gap-4 lg:flex-row '>
        {/* //? Song Carousel */}
        <SongHighlightCarousel />

        {/* //? Songs Top 50 Leaderboard */}
        <LandingPageCharts />
      </section>
      <Divider
        my='xs'
        label={
          <h1 className='unselectable text-foreground text-2xl font-bold'>
            Gallery
          </h1>
        }
        labelPosition='center'
        className=' px-8 py-2'
      />
      {/* //? Infinite Gallery */}
      <SongsInfiniteGallery />
      {/* //? Footer with tech used & personal links */}
    </section>
  )
}
export default LandingPage
