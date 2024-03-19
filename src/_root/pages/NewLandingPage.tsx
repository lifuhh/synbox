import HomeCarousel from '@/components/landing-page-carousel/HomeCarousel'
import BottomBar from '@/components/shared/BottomBar'
import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGetLandingPagePlaylist } from '@/lib/react-query/queriesAndMutations'
import { Divider } from '@mantine/core'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

const NewLandingPage = () => {
  const { data: playlistData, isLoading: isPlaylistDataFetching } =
    useGetLandingPagePlaylist()

  return (
    //* <!-- This is the main container for the landing page -->
    <section className='overflow-y-scroll flex flex-col flex-1 px-2 md:px-10 custom-scrollbar pt-14'>
      {/* //? This is the song URL input area >> convert to component */}
      <section className='lyrics-generator sm:p-5  bg-orange-200'>
        <div className='flex sm:mx-auto sm:w-3/4 h-20 lg:h-48 md:w-3/5 gap-2 flex-between'>
          <Input placeholder='Paste youtube URL here' className='py-4' />
          <Button size='icon'>
            <AccountBoxIcon sx={{ fontSize: 36 }} />
          </Button>
        </div>
      </section>

      {/* //? This is the Carousel + Leaderboard (placeholder) */}
      <section className='highlights w-full flex flex-col sm:flex-row gap-2 lg:gap-8 space-between lg:p-0'>
        <div className='w-full sm:w-2/3 lg:w-8/12 h-96 mt-8 bg-emerald-400 bg-opacity-75 p-8 flex items-center justify-center'>
          {isPlaylistDataFetching && !playlistData ? (
            <Loader />
          ) : (
            <HomeCarousel items={playlistData || []} />
          )}
        </div>
        <div className='w-full sm:w-1/3 lg:w-4/12 mt-8 bg-slate-600  lg:mx-8 h-96'>
          <h1>Hey2</h1>
        </div>
      </section>

      {/* //? This is the Featured Songs Section */}
      <Divider
        my='lg'
        label='Featured Songs'
        labelPosition='center'
        className='p-4'
      />
      <section className='flex flex-wrap justify-between'>
        {Array.from({ length: 25 }, (_, index) => (
          //* Repeat this card block for each item
          <div className='w-full sm:w-1/2 lg:w-1/3 mb-4 px-2' key={index}>
            <div className='bg-white rounded-lg shadow-lg p-4 h-80'>
              {/* <!-- Card content goes here --> */}
            </div>
          </div>
          //* End of card block
        ))}
      </section>
      <BottomBar />
    </section>
  )
}
export default NewLandingPage
