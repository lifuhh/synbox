import { motion } from 'framer-motion'
import React, { memo, useEffect, useRef, useState } from 'react'

//TODO: dont think this component works, remove it
const HoverTranslateText = ({
  text,
  revealText,
  className,
}: {
  text: string
  revealText: string
  className?: string
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [left, setLeft] = useState(0)
  const [localWidth, setLocalWidth] = useState(0)
  const [isMouseOver, setIsMouseOver] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect()
      setLeft(left)
      setLocalWidth(width)
    }
  }, [])

  const mouseMoveHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const clientX = event.clientX
    const relativeX = clientX - left
    setWidthPercentage((relativeX / localWidth) * 100)
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false)
    setWidthPercentage(0)
  }
  function mouseEnterHandler() {
    setIsMouseOver(true)
  }

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      ref={cardRef}
      className={`relative overflow-hidden  ${className}`}
      style={{ background: 'transparent', width: '240px', padding: '10px' }}>
      <motion.div
        animate={{
          clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
        }}
        transition={{ duration: 0.2 }}
        className='absolute h-full w-full'
        style={{
          backgroundColor: isMouseOver ? 'bg-red' : 'transparent',
        }}>
        <p className='select-none text-lg font-bold text-primary-600'>
          {revealText}
        </p>
      </motion.div>
      <p
        className='select-none text-lg font-bold'
        style={{ color: 'white', position: 'relative' }}>
        {text}
      </p>
      {/* <MemoizedStars /> */}
    </div>
  )
}

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2
  const randomOpacity = () => Math.random()
  const random = () => Math.random()
  return (
    <div className='absolute inset-0'>
      {[...Array(140)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            zIndex: 1,
          }}
          className='inline-block'></motion.span>
      ))}
    </div>
  )
}

export const MemoizedStars = memo(Stars)

export default HoverTranslateText
