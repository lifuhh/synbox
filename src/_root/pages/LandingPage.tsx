import HomeCarousel from '@/components/landing-page-carousel/HomeCarousel'
import BottomBar from '@/components/shared/BottomBar'
import Loader from '@/components/shared/Loader'
import { useGetLandingPagePlaylist } from '@/lib/react-query/queriesAndMutations'

const LandingPage = () => {
  //?TEST_DRIVE_QUERY
  const { data: playlistData, isLoading: isPlaylistDataFetching } =
    useGetLandingPagePlaylist()

  return (
    <>
      <div className='flex items-center justify-center w-full'>
        {isPlaylistDataFetching && !playlistData ? (
          <Loader />
        ) : (
          <HomeCarousel items={playlistData || []} />
        )}
      </div>
      <BottomBar />
    </>
  )
}
export default LandingPage
