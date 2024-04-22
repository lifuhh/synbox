import HeroGenerateLyricsSection from '@/components/generate-lyrics/HeroGenerateLyricsSection'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HoverTranslateText from '@/components/landing-page/HoverTranslateText'
import PopularSongsTable from '@/components/landing-page/PopularSongsTable'
import SongHighlightCarousel from '@/components/landing-page/SongHighlightCarousel'
import SongsInfiniteGallery from '@/components/landing-page/SongsInfiniteGallery'
import BottomBar from '@/components/shared/BottomBar'

import { Divider } from '@mantine/core'

const LandingPage = () => {
  return (
    //* <!-- This is the main container for the landing page -->
    <section className='overflow-y-scroll flex flex-col flex-1 py-2 md:px-10 custom-scrollbar'>
      {/* //? This is the song URL input area >> convert to component */}
      <HeroGenerateLyricsSection />
      {/* //TODO: Figure out how to do the mouseover to reveal different text */}
      {/* <Divider
        my='xs'
        label={
          <HoverTranslateText text='おすすめ' revealText='Recommendations' />
        }
        labelPosition='center'
        className='p-4'
      /> */}
      <Divider
        my='xs'
        label={
          <h1 className='text-2xl font_noto_sans_jp_black_900 font-bold text-light-2 pointer-events-none'>
            おすすめ
          </h1>
        }
        labelPosition='center'
        className='p-4'
      />
      {/* //? This is the Carousel + Leaderboard (placeholder) */}
      <section className='w-full flex flex-col lg:flex-row gap-4 '>
        <SongHighlightCarousel />
        <PopularSongsTable />
      </section>
      <Divider
        my='xs'
        label={
          <h1 className='text-2xl font-bold text-light-2 pointer-events-none'>
            Gallery
          </h1>
        }
        labelPosition='center'
        className='p-4'
      />
      <SongsInfiniteGallery />
      <BottomBar />
    </section>
  )
}
export default LandingPage
