import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Spotlight } from '../ui/Spotlight'

const HeroGenerateLyricsSection = () => {
  return (
    <section className='lyrics-generator px-4 mt-2'>
      <div className='md:h-[25rem] w-full rounded-md flex items-top md:justify-center pt-10 bg-dark-1/[0.15] antialiased bg-grid-white/[0.90] relative  overflow-hidden'>
        <Spotlight
          className='-top-8 left-10 md:left-60 md:-top-20'
          fill='pink'
        />

        <div className='p-4 max-w-7xl  mx-auto relative z-10 w-full gap-4 lg:gap-0 flex-between xl:flex-around flex-col sm:mx-auto xl:h-96'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-2 no-select'>
            AI-Powered Japanese Karaoke
          </h1>
          <div className='sm:mx-auto w-full sm:w-4/5 flex-between gap-4'>
            <Input
              placeholder='Paste YouTube URL here'
              // border-2 border-primary-500/40 hover:border-primary-500/90
              // focus:ring-0 focus:ring-violet-300
              // focus:outline-none focus:ring-0 focus:ring-teal-300
              className='py-6 focus:ring-transparent hover:border-secondary border-2  focus:border-white border-primary'
            />
            <Button
              variant='default'
              role='combobox'
              className='w-[120px] py-6 border-2 border-primary-500/40 hover:border-primary-500/90 hover:bg-gray-200/20'>
              Sing This!
            </Button>
          </div>
          <p className='lg:w-7/10 mt-4 font-normal text-base text-neutral-300 no-select text-center mx-auto'>
            Step into a Karaoke haven with Synbox, effortlessly bringing any
            Japanese song from YouTube to life. Just paste a link, and if the
            song lacks lyrics, Synbox's use of OpenAI's Whisper generates
            synchronized karaoke lyrics with romaji. For a deeper dive, we offer
            varied translations to enrich your understanding and singing
            experience. Synbox is the perfect stage for all Japanese music
            lovers, regardless of language proficiency.
          </p>
        </div>
      </div>
    </section>
  )
}
export default HeroGenerateLyricsSection
