import React, { useEffect, useRef, useState } from 'react'

const VolumeControlSlider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
}: {
  min?: number
  max?: number
  step?: number
  value: number
  onChange: (value: number) => void
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    updateValue(e)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValue(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateValue = (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (slider) {
      const rect = slider.getBoundingClientRect()
      const percentage = (e.clientX - rect.left) / rect.width
      const newValue =
        Math.round((percentage * (max - min) + min) / step) * step
      onChange(Math.max(min, Math.min(max, newValue)))
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div
      ref={sliderRef}
      className='relative h-2 w-full cursor-pointer rounded-full bg-light-2'
      onMouseDown={handleMouseDown}>
      <div
        className='absolute h-full rounded-full bg-primary'
        style={{ width: `${percentage}%` }}
      />
      <div
        className='absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-light-2 bg-primary'
        style={{ left: `${percentage}%` }}
      />
    </div>
  )
}

export default VolumeControlSlider
