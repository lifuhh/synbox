import Loader from '@/components/shared/Loader'

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { formattedYoutubeVideoItemForCarousel } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useLockBodyScrollOnHover } from '@/hooks/useLockScrollOnHover'
import { useGetLandingPagePlaylist } from '@/lib/react-query/queriesAndMutations'
import SongHighlightCarouselItem from './SongHighlightCarouselItem'

Autoplay.globalOptions = { delay: 7000 }

const SongHighlightCarousel = () => {
  const { data: playlistData, isLoading: isPlaylistDataFetching } =
    useGetLandingPagePlaylist()

  const slidesNumber = useMemo(() => playlistData?.length, [playlistData])

  const carouselRef = useRef<HTMLDivElement>(null)

  //* UseEffect to prevent page from scrolling when user hovers over the carousel
  useLockBodyScrollOnHover(carouselRef, 640)

  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)

  //* UseEffect for Carousel Animations (Embla specified)
  useEffect(() => {
    if (!api) {
      return
    }
    let isThrottled = false // Throttle flag
    if (isThrottled) return // Exit if throttled
    isThrottled = true // Set throttle flag

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    let accumulatedDeltaY = 0 // Accumulator for deltaY values
    const deltaYThreshold = 100 // Threshold to trigger scroll, adjust as needed
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null // Throttle timeout

    // function to handle left/right arrow key press
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the current focused element is an input field to prevent navigation when typing
      if (document?.activeElement?.tagName !== 'INPUT') {
        switch (e.key) {
          case 'ArrowLeft':
            api.scrollPrev() // Navigate to the previous slide
            break
          case 'ArrowRight':
            api.scrollNext() // Navigate to the next slide
            break
          default:
            break
        }

        setTimeout(() => {
          isThrottled = false // Reset throttle flag after a delay
        }, 100) // Adjust delay as needed
      }
    }

    // Function to handle wheel event
    const handleWheel = (e: WheelEvent) => {
      accumulatedDeltaY += e.deltaX

      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          if (accumulatedDeltaY > deltaYThreshold) {
            api.scrollNext() // Scroll to next slide
          } else if (accumulatedDeltaY < -deltaYThreshold) {
            api.scrollPrev() // Scroll to previous slide
          }
          // Reset accumulator and throttle timeout after action
          accumulatedDeltaY = 0
          if (throttleTimeout) clearTimeout(throttleTimeout)
          throttleTimeout = null
        }, 100) // Throttle timeout, adjust as needed for sensitivity
      }
    }

    const emblaContainer = api.containerNode() // Get the Embla container
    emblaContainer.addEventListener('wheel', handleWheel, { passive: true })
    api.on('select', () => {
      // Adjusted logic to ensure the middle card is considered as the current card
      // This might involve calculating the index based on your carousel's specific implementation details
      const newIndex = api.selectedScrollSnap()
      setCurrent(newIndex)
    })
    // Add wheel event listener to the Embla container
    emblaContainer.addEventListener('wheel', handleWheel, { passive: true })

    // Add the event listener to the window object
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup event listener on component unmount
    return () => {
      emblaContainer.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [api])

  const carouselItems = useMemo(
    () =>
      playlistData && slidesNumber
        ? playlistData.map((item, itemIndex) => (
            <CarouselItem
              key={itemIndex}
              className={`
     sm:basis-2/5
    sm:px-3
    ${current == itemIndex ? 'z-30' : 'z-10'}
    `}>
              <SongHighlightCarouselItem
                opacity={1}
                index={itemIndex + 1}
                currentIndex={current}
                itemCount={slidesNumber}
                item={item}
              />
            </CarouselItem>
          ))
        : '',
    [playlistData, slidesNumber, current]
  )

  return (
    <div className='w-full lg:w-7/12 h-96 mt-2 bg-dark-3 bg-opacity-15 py-8 px-4 flex items-center justify-center rounded-md'>
      {isPlaylistDataFetching && !playlistData ? (
        <Loader />
      ) : (
        <div ref={carouselRef} className={`overflow-hidden`}>
          <Carousel
            opts={{
              loop: true,
              dragFree: true,
              containScroll: 'trimSnaps',
              startIndex: 1,
            }}
            setApi={setApi}
            plugins={[Autoplay()]}>
            {/* //TODO: need to move this carousel down when fullscreened, current fix doesnt work */}
            <CarouselContent className={`-ml-3`}>
              {carouselItems}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
      )}
    </div>
  )
}
export default SongHighlightCarousel
