import { useGetInfiniteGalleryPlaylist } from '@/lib/react-query/queriesAndMutations'
import { InfiniteGalleryVideoItem } from '@/types'
import { Loader } from '@mantine/core'
import React, { useEffect } from 'react'
import HomeFooter from '../shared/HomeFooter'
import { Spotlight } from '../ui/Spotlight'
import { InfiniteScrollGallery } from './InfiniteScrollGallery'

const SongsInfiniteGallery: React.FC = () => {
  const {
    data: infiniteGallerySongData,
    isLoading: isInfiniteGallerySongDataFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteGalleryPlaylist()

  return (
    <section className='relative flex flex-wrap justify-between'>
      <Spotlight
        className='-top-80 left-40 scale-x-[-1]  md:-left-40 md:top-20'
        fill='#580a24'
      />
      <div className='mx-auto h-[calc(100vh-200px)] max-w-full gap-2 px-8'>
        {infiniteGallerySongData && (
          <InfiniteScrollGallery
            items={infiniteGallerySongData.pages.flatMap((page) =>
              page.items.map(
                (item): InfiniteGalleryVideoItem => ({
                  title: item.title,
                  channel: item.channel || 'Unknown',
                  description: item.description,
                  thumbnailUrl: item.thumbnailUrl,
                  videoId: item.videoId,
                }),
              ),
            )}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
        {isInfiniteGallerySongDataFetching && (
          <div className='my-0 flex w-full min-w-full items-center justify-center'>
            <Loader color='pink' size='lg' type='dots' />
          </div>
        )}
        <HomeFooter />
      </div>
    </section>
  )
}

export default SongsInfiniteGallery
