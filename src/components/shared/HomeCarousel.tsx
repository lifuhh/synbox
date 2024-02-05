/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import HomeCarouselItem from './HomeCarouselItem'

Autoplay.globalOptions = { delay: 6500 }

const HomeCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    let accumulatedDeltaY = 0 // Accumulator for deltaY values
    const deltaYThreshold = 100 // Threshold to trigger scroll, adjust as needed
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null // Throttle timeout

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
      setCurrent(api.selectedScrollSnap() + 1)
    })
    // Add wheel event listener to the Embla container
    emblaContainer.addEventListener('wheel', handleWheel, { passive: true })

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    // Cleanup event listener on component unmount
    return () => {
      emblaContainer.removeEventListener('wheel', handleWheel)
    }
  }, [api])

  const slidesNumber = 10

  const tempSlidesNumberGenerator = Array.from(
    { length: slidesNumber },
    (_, index) => index + 1
  )

  return (
    <div className='overflow-hidden'>
      <Carousel
        opts={{
          loop: true,
          dragFree: true,
          containScroll: 'trimSnaps',
          startIndex: 2,
        }}
        setApi={setApi}
        plugins={[Autoplay()]}>
        <CarouselContent className='-ml-3'>
          {tempSlidesNumberGenerator.map((slideIndex) => (
            <CarouselItem key={slideIndex} className='basis-1/3 pl-3'>
              <HomeCarouselItem
                opacity={1}
                index={slideIndex}
                currentIndex={current}
                itemCount={slidesNumber}
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
