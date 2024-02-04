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

Autoplay.globalOptions = { delay: 10000 }

const HomeCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Create an array from 1 to 10
  const tempSlidesNumberGenerator = Array.from(
    { length: 10 },
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
        <CarouselContent>
          {tempSlidesNumberGenerator.map((slideIndex) => (
            <CarouselItem key={slideIndex} className='basis-1/4 m-24'>
              <HomeCarouselItem opacity={1} index={slideIndex} />
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
