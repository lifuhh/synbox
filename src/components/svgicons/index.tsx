import { FC, SVGAttributes } from 'react'

export const SearchIcon: FC<SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  )
}

export const SearchBarToggleViewIcon: FC<SVGAttributes<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 -960 960 960'
      fill='white'
      stroke='red'
      strokeWidth='20'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z' />
    </svg>
  )
}

export const TempSquareIconTest: React.FC = () => {
  return (
    <svg
      className='h-10 w-10' // 24x24 pixels
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect
        x='3'
        y='3'
        width='18'
        height='18'
        stroke='currentColor'
        strokeWidth='2'
      />
    </svg>
  )
}
