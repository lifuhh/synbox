import { cn } from '@/utils/cn'

type SpotlightProps = {
  className?: string
  fill?: 'primary' | 'secondary' | 'accent' | 'muted' | 'destructive' | string
  opacity?: number
}

export const Spotlight = ({
  className,
  fill = 'primary',
  opacity = 0.28,
}: SpotlightProps) => {
  // Helper function to get color value
  const getColorValue = (color: string) => {
    // Handle theme colors that use HSL variables
    const themeColors: Record<string, string> = {
      primary: 'hsla(var(--primary))',
      secondary: 'hsla(var(--secondary))',
      accent: 'hsla(var(--accent))',
      muted: 'hsla(var(--muted))',
      destructive: 'hsla(var(--destructive))',
    }

    // If it's a predefined theme color, return it
    if (color in themeColors) {
      return themeColors[color]
    }

    // If it's already an HSL/HSLA value, return as is
    if (color.startsWith('hsl')) {
      return color
    }

    // Handle hex codes
    if (color.startsWith('#')) {
      return color
    }

    // Default fallback
    return 'hsla(var(--primary))'
  }

  return (
    <svg
      className={cn(
        'pointer-events-none absolute z-[0] h-[169%] w-[138%] animate-spotlight opacity-0 lg:w-[84%]',
        className,
      )}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 3787 2842'
      fill='none'>
      <g filter='url(#filter)'>
        <ellipse
          cx='1924.71'
          cy='273.501'
          rx='1924.71'
          ry='273.501'
          transform='matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)'
          fill={getColorValue(fill)}
          fillOpacity={opacity}></ellipse>
      </g>
      <defs>
        <filter
          id='filter'
          x='0.860352'
          y='0.838989'
          width='3785.16'
          height='2840.26'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'></feBlend>
          <feGaussianBlur
            stdDeviation='151'
            result='effect1_foregroundBlur_1065_8'></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  )
}
