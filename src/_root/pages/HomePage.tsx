import HomeCarousel from '@/components/shared/HomeCarousel'
import playlistData from '@/constants/sampleYtPlaylistData.json'
import { formatYoutubePlaylistResponse } from '@/utils/index'

const HomePage = () => {
  const playlistString = JSON.stringify(playlistData)
  const playlistItems = formatYoutubePlaylistResponse(playlistString)
  console.log(playlistItems)

  return (
    <div className='flex items-center justify-center w-full'>
      <HomeCarousel items={playlistItems} />
    </div>
  )
}
export default HomePage
