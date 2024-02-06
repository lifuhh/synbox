import { formattedVideoItemForCarousel } from '@/types'
import React, { CSSProperties } from 'react'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'

type HomeCarouselItemProps = {
  opacity: number
  index: number
  currentIndex: number
  itemCount: number // Pass the total number of items as a prop
  item: formattedVideoItemForCarousel
}

const HomeCarouselItem: React.FC<HomeCarouselItemProps> = ({
  opacity,
  index,
  currentIndex,
  itemCount,
  item,
}) => {
  // Adjust the index to be 0-based
  const adjustedIndex = index - 1
  let distance = Math.abs(adjustedIndex - currentIndex)

  // Adjust the distance for looping scenarios
  if (currentIndex === 0 && adjustedIndex === itemCount - 1) {
    // Special case when transitioning from the first to the last item
    distance = 1 // Treat it as the next item for consistent scaling
  } else if (currentIndex === itemCount - 1 && adjustedIndex === 0) {
    // Special case when transitioning from the last to the first item
    distance = 1 // Treat it as the next item for consistent scaling
  } else {
    distance = Math.min(distance, itemCount - distance)
  }

  const scaleBase = 0.18 // Base scale factor
  const scale = 1 - scaleBase * distance
  const opacityDecrement = 0.18 // Opacity decrement factor
  const opacityInRange = Math.max(1 - opacityDecrement * distance, 0.2) // Ensure opacity is not less than 0.2

  const cardStyle: CSSProperties = {
    transform: `scale(${scale})`, // Apply calculated scale
    opacity: opacityInRange, // Apply calculated opacity
    transition: 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out', // Smooth transition
  }

  return (
    <div style={{ opacity }}>
      <div style={cardStyle}>
        <CardContainer>
          <CardBody className='bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border'>
            <CardItem
              translateZ='50'
              className='text-xl font-bold text-neutral-600 dark:text-white'>
              {item.title}
            </CardItem>

            <CardItem
              translateZ='100'
              rotateX={20}
              rotateZ={-10}
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
              className='text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300'>
              {item.description}
            </CardItem>
            <div className='flex justify-between items-center mt-10'>
              <CardItem
                translateZ={10}
                translateX={-30}
                as='button'
                className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white text-blue-900'>
                {item.channel}
              </CardItem>
              <CardItem
                translateZ={10}
                translateX={30}
                as='button'
                className='px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold'>
                {item.videoId}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}
export default HomeCarouselItem
