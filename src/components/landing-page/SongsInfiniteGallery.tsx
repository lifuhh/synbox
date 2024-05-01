import { shuffleArray } from '@/utils'
import { Spotlight } from '../ui/Spotlight'
import { InfiniteScrollGallery } from './InfiniteScrollGallery'
import sampleData from './SongInfiniteGallerySample.json'

const sampleGalleryData = shuffleArray(
  sampleData.items.map((item) => {
    return {
      title: item.snippet.title,
      description: item.snippet.description,
      vidUrl: item.snippet.thumbnails.maxres
        ? item.snippet.thumbnails.maxres.url
        : item.snippet.thumbnails.standard.url,
      videoId: item.snippet.resourceId.videoId,
    }
  }, [])
) as { title: string; description: string; vidUrl: string; videoId: string }[]

const SongsInfiniteGallery = () => {
  return (
    <section className='flex flex-wrap justify-between relative'>
      <Spotlight
        className='-top-80 left-40 md:-left-40 md:top-20 scale-x-[-1]'
        fill='pink'
      />
      <div className='max-w-full mx-auto px-8'>
        <InfiniteScrollGallery items={sampleGalleryData} />
      </div>
    </section>
  )
}
export default SongsInfiniteGallery
