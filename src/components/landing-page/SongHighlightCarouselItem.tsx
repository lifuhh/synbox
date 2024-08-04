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

const SongHighlightCarouselItem: React.FC<SongHighlightCarouselItemProps> = ({
  opacity,
  index,
  currentIndex,
  itemCount,
  item,
}) => {
  /*   channel
"Ayase / YOASOBI"
description
"ストリーミング/ダウンロード絶賛配信中\nhttps://orcd.co/taisho_romance\n\nMusic : Ayase (https://twitt..."
thumbnailUrl
"https://i.ytimg.com/vi/wJQ9ig_d8yY/hqdefault.jpg"
title
"YOASOBI「大正浪漫」Official Music Video"
videoId
"wJQ9ig_d8yY" */

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
          <CardBody className='group/card relative h-auto w-[30rem] rounded-xl border border-black/[0.1]  bg-gray-100 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]'>
            <CardItem
              translateZ='50'
              as='button'
              className='max-h-12 min-h-12 text-left text-xl font-bold text-primary dark:text-primary'
              onClick={handleNavigate}>
              {item.title}
            </CardItem>
            <CardItem
              translateZ='100'
              rotateX={10}
              rotateZ={-3}
              className='my-2 w-full'>
              <img
                src={item.thumbnailUrl}
                height='1080'
                width='1920'
                className='unselectable h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl'
                alt='thumbnail'
              />
            </CardItem>
            {/* <CardItem
              as='p'
              translateZ='60'
              className='unselectable text-md mb-2 max-w-sm text-neutral-500 dark:text-neutral-300'>
              {item.description}
            </CardItem> */}
            <div className='mt-6 flex justify-between'>
              <CardItem
                translateZ={10}
                // translateX={-30}
                // as='button'
                className='text-md unselectable rounded-xl px-4 py-1 font-normal text-secondary dark:text-white'>
                {item.channel}
              </CardItem>
              <Button
                className='rounded-xl px-4 py-2 text-sm font-bold text-white'
                onClick={handleNavigate}
                variant={'secondary'}>
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
