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
  console.log({ item })

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
    <div style={{ opacity }} className='scale-75 min-h-100'>
      <div style={cardStyle}>
        <CardContainer>
          <CardBody className='bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[30rem] h-auto rounded-xl p-6 border'>
            <CardItem
              translateZ='50'
              className='text-xl font-bold text-neutral-600 dark:text-white min-h-12 max-h-12'>
              {item.title}
            </CardItem>

            <CardItem
              translateZ='100'
              // rotateX={20}
              // rotateZ={-10}
              className='w-full mt-4'>
              <img
                src={item.thumbnailUrl}
                height='1080'
                width='1920'
                className='h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl'
                alt='thumbnail'
              />
            </CardItem>
            <CardItem
              as='p'
              translateZ='60'
              className='text-neutral-500 text-sm max-w-sm mt-2 min-h-12 max-h-12 dark:text-neutral-300'>
              {item.description}
            </CardItem>
            <div className='flex justify-between items-center mt-10'>
              <CardItem
                translateZ={10}
                // translateX={-30}
                as='button'
                className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white text-blue-900'>
                {item.channel}
              </CardItem>
              <button
                className='px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold'
                onClick={handleNavigate}>
                <CardItem
                  translateZ={10}
                  // translateX={30}
                >
                  {item.videoId}
                </CardItem>
              </button>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}
export default SongHighlightCarouselItem
