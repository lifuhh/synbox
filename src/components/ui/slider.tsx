'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/utils/cn'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex touch-none select-none',
      "data-[orientation='horizontal']:h-2 data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
      "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-2 data-[orientation='vertical']:justify-center",
      className,
    )}
    {...props}>
    <SliderPrimitive.Track
      className={cn(
        'bg-popover-foreground relative grow overflow-hidden rounded-full',
        "data-[orientation='horizontal']:h-2 data-[orientation='horizontal']:w-full",
        "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-2",
      )}>
      <SliderPrimitive.Range
        className={cn(
          'absolute bg-primary',
          "data-[orientation='horizontal']:h-full",
          "data-[orientation='vertical']:w-full",
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='focus-visible:ring-ring block h-5 w-5 rounded-full border-2 border-off-white bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
