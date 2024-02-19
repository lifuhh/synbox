import HomeCarousel from '@/components/shared/HomeCarousel'
import Loader from '@/components/shared/Loader'
import playlistData from '@/constants/sampleYtPlaylistData.json'
import { useGetLandingPagePlaylist } from '@/lib/react-query/queriesAndMutations'
import { formatYoutubePlaylistResponse } from '@/utils'

const LandingPage = () => {
  //?TEST_DRIVE_QUERY
  // const { data: playlistData, isLoading: isPlaylistDataFetching } =
  //   useGetLandingPagePlaylist()

  const playlistString = JSON.stringify(playlistData)
  const playlistItems = formatYoutubePlaylistResponse(playlistString)
  // console.log(playlistItems)

  return (
    <div className='flex items-center justify-center w-full'>
      {/* //?TEST_DRIVE_QUERY */}
      {/* {isPlaylistDataFetching && !playlistData ? (
        <Loader />
      ) : (
        <HomeCarousel items={playlistItems} />
      )} */}
      <HomeCarousel items={playlistItems} />
    </div>
  )
}
export default LandingPage
