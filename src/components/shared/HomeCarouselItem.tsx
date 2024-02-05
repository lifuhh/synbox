import React, { CSSProperties } from 'react'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'

type HomeCarouselItemProps = {
  opacity: number
  index: number
  currentIndex: number
  itemCount: number // Pass the total number of items as a prop
}

const HomeCarouselItem: React.FC<HomeCarouselItemProps> = ({
  opacity,
  index,
  currentIndex,
  itemCount,
}) => {
  const distance =
    Math.min(
      Math.abs(currentIndex - index),
      Math.abs(currentIndex - (index + itemCount)), // Account for looping
      Math.abs(currentIndex - (index - itemCount)) // Account for looping
    ) * 2.5 // The higher this number, the smaller the unfocused cards

  // Calculate opacity based on distance
  const maxOpacity = 1 // Maximum opacity for the focused card
  const minOpacity = 0.2 // Minimum opacity for out-of-focus cards

  // Apply transformations based on the distance
  const translateZ = 50 - distance * 10 // Adjust the values as needed
  const scale = 1 - distance * 0.05

  // Calculate opacity based on distance
  const calculatedOpacity = maxOpacity - distance * 0.18 // Higher the number, darker the unfocused cards
  const opacityInRange = Math.max(
    minOpacity,
    Math.min(maxOpacity, calculatedOpacity)
  )

  const cardStyle: CSSProperties = {
    transform: `translateZ(${translateZ}px) scale(${scale})`,
    opacity: opacityInRange, // Set the opacity
    transition: 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out', // Add a smooth transition
  }

  return (
    <div style={{ opacity }}>
      <div style={cardStyle}>
        <CardContainer>
          <CardBody className='bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border'>
            <CardItem
              translateZ='50'
              className='text-xl font-bold text-neutral-600 dark:text-white'>
              {/* Make things float in air, index is {index} */}
              {/* "【女性が歌う】あとひとつ/FUNKY MONKEY BABYS (Covered by コバソロ */}
              {/* &amp; こぴ)" */}
              {/* 【女性が歌う】Lemon/米津玄師(Full Covered by コバソロ &amp; 春茶) */}
              YOASOBI - 優しい彗星 / THE FIRST TAKE
            </CardItem>

            <CardItem
              translateZ='100'
              rotateX={20}
              rotateZ={-10}
              className='w-full mt-4'>
              <img
                // src='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                // src='https://i.ytimg.com/vi/bGBy80LdkPI/hqdefault.jpg'
                // src='https://i.ytimg.com/vi/clU8c2fpk2s/hqdefault.jpg'
                src='https://i.ytimg.com/vi/EaA6NlH80wg/hqdefault.jpg'
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
              {/* Hover over this card to unleash the power of CSS perspective */}
              {/* kobasolo */}
              {/* 今回はFUNKY MONKEY */}
              {/* BABYSのあとひとつをカバーしました。今回のボーカルはこぴさん！チャンネル登録してね！ */}
              「THE FIRST
              TAKE」は、一発撮りのパフォーマンスを鮮明に切り取るYouTubeチャンネル。
              ONE TAKE ONLY, ONE LIFE ONLY.
            </CardItem>
            <div className='flex justify-between items-center mt-10'>
              <CardItem
                translateZ={10}
                translateX={-30}
                as='button'
                className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white text-blue-900'>
                Try now →
              </CardItem>
              <CardItem
                translateZ={10}
                translateX={30}
                as='button'
                className='px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold'>
                Sign up
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}
export default HomeCarouselItem
