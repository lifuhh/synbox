import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Spotlight } from '../ui/Spotlight'

const GenerateLyricsInput = () => {
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
              className='py-6 focus:ring-transparent focus:border-white border-2 border-primary'
            />
            <Button
              variant='default'
              role='combobox'
              className='w-[120px] py-6 border-2 border-primary-500/40 hover:border-primary-500/90 hover:bg-gray-200/20'>
              Generate Lyrics
            </Button>
          </div>
          <p className='w-full sm:w-4/5 mt-4 font-normal text-base text-neutral-300 no-select max-w-3xl text-center mx-auto'>
            Spotlight effect is a great way to draw attention to a specific part
            of the page. Here, we are drawing the attention towards the text
            section of the page. I don&apos;t know why but I&apos;m running out
            of copy.
          </p>
        </div>
      </div>
      {/* <div className='flex sm:mx-auto sm:w-3/4 h-20 lg:h-96 md:w-3/5 gap-2 flex-between'>
        <Input placeholder='Paste youtube URL here' className='py-4' />
        <Button size='icon'>
          <AccountBoxIcon sx={{ fontSize: 36 }} />
        </Button>
      </div> */}
    </section>
  )
}
export default GenerateLyricsInput
