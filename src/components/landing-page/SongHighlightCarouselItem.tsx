import { formattedYoutubeVideoItemForCarousel } from '@/types'
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'
import { Button } from '../ui/button'

type SongHighlightCarouselItemProps = {
  opacity: number
  index: number
  currentIndex: number
  itemCount: number // Pass the total number of items as a prop
  item: formattedYoutubeVideoItemForCarousel
}

const SongHighlightCarouselItem = ({
  opacity,
  index,
  currentIndex,
  itemCount,
  item,
}: SongHighlightCarouselItemProps) => {
  const [cardStyle, setCardStyle] = useState<CSSProperties>({})
  const requestRef = useRef<number>()
  const navigate = useNavigate()

  const handleNavigate = useCallback(() => {
    navigate(`/v/${item.videoId}`, { state: { videoId: item.videoId } })
  }, [item.videoId, navigate])

  useEffect(() => {
    const calculateStyles = () => {
      const adjustedIndex = index - 1
      let distance = Math.abs(adjustedIndex - currentIndex)

      if (currentIndex === 0 && adjustedIndex === itemCount - 1) {
        distance = 1
      } else if (currentIndex === itemCount - 1 && adjustedIndex === 0) {
        distance = 1
      } else {
        distance = Math.min(distance, itemCount - distance)
      }

      const scaleBase = 0.18
      const scale = 1 - scaleBase * distance
      const opacityDecrement = 0.18
      const opacityInRange = Math.max(1 - opacityDecrement * distance, 0.2)

      return {
        transform: `scale(${scale})`,
        opacity: opacityInRange,
        transition: 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out',
      }
    }

    const animate = () => {
      setCardStyle(calculateStyles())
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [currentIndex, itemCount, index])

  return (
    <div style={{ opacity }} className=' scale-75'>
      <div style={cardStyle}>
        <CardContainer>
          <CardBody className='group/card relative h-auto w-[30rem] rounded-xl border border-primary/70 bg-muted p-6 transition-shadow duration-300 ease-in-out dark:hover:shadow-2xl dark:hover:shadow-primary/[0.15]'>
            <CardItem
              translateZ='50'
              as='button'
              className='unhighlightable max-h-12 min-h-12 text-left text-xl font-bold text-card-foreground shadow-sm'
              onClick={handleNavigate}>
              {item.title}
            </CardItem>
            <CardItem
              translateZ='120'
              rotateX={10}
              rotateZ={-3}
              className='my-2 w-full cursor-pointer'
              onClick={handleNavigate}>
              <img
                src={item.thumbnailUrl}
                height='1080'
                width='1920'
                className='unselectable h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl'
                alt='thumbnail'
              />
            </CardItem>
            <div className='mt-6 flex justify-between'>
              <CardItem
                translateZ={10}
                className='text-md unselectable rounded-xl px-4 py-1 font-normal text-white'>
                {item.channel}
              </CardItem>
              <Button
                className='rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary/80 hover:bg-primary/80 hover:text-foreground [&:hover]:transition-none [&:hover]:duration-0'
                onClick={handleNavigate}
                variant='default'>
                <CardItem
                  translateZ={10}
                  // translateX={30}
                >
                  Watch Now
                </CardItem>
              </Button>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}
export default SongHighlightCarouselItem
