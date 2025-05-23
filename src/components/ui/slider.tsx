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
        'relative grow overflow-hidden rounded-full bg-popover-foreground',
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
    <SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border-2 border-foreground bg-primary ring-offset-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
