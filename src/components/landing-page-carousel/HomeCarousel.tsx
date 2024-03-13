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
import { useEffect, useState } from 'react'
import BottomBar from '../shared/BottomBar'
import HomeCarouselItem from './HomeCarouselItem'

Autoplay.globalOptions = { delay: 4000 }

type HomeCarouselProps = {
  items: formattedYoutubeVideoItemForCarousel[]
}

const HomeCarousel = ({ items }: HomeCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Different browsers have different properties for detecting fullscreen
      const isFullscreenNow =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      setIsFullscreen(!!isFullscreenNow)
    }

    // Add event listeners for different browsers
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      // Make sure to remove the event listeners on component unmount
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      )
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      )
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

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
      accumulatedDeltaY += e.deltaY

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
        }, 150) // Throttle timeout, adjust as needed for sensitivity
      }
    }

    const emblaContainer = api.containerNode() // Get the Embla container
    emblaContainer.addEventListener('wheel', handleWheel, { passive: true })
    api.on('select', () => {
      // Adjusted logic to ensure the middle card is considered as the current card
      // This might involve calculating the index based on your carousel's specific implementation details
      const newIndex = api.selectedScrollSnap() + 1 - 1 // Adjusted to account for the middle card
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

  const slidesNumber = items.length

  //      className={`absolute bg-white shadow-md rounded-md grid gap-1 p-2 top-full left-0 z-50 w-full ${isOpen ? 'block' : 'hidden'} ${className || ''}`}

  return (
    <div className={`overflow-hidden `}>
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
        <CarouselContent className={`-ml-3 ${isFullscreen ? ' mt-40' : ''}`}>
          {items.map((item, itemIndex) => (
            <CarouselItem
              key={itemIndex}
              className='md:basis-1/2 xl:basis-1/3 md:px-3'>
              <HomeCarouselItem
                opacity={1}
                index={itemIndex + 1}
                currentIndex={current}
                itemCount={slidesNumber}
                item={item}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default HomeCarousel
