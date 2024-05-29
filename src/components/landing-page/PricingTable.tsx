import { PLANS } from '@/lib/stripe/config'
import { cn } from '@/utils/cn'
import { ArrowRight, Check, HelpCircle, Minus } from 'lucide-react'
import { Button, buttonVariants } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

const PricingTable = () => {
  const pricingPlans = [
    {
      plan: 'Free',
      tagline: 'For everyone',
      quota: 3,
      features: [
        {
          text: 'Unlimited access to songs',
          footnote: '',
        },
        {
          text: 'Access to the song gallery',
          footnote: '',
        },
        {
          text: '3 song translations per day',
          footnote: 'The maximum number of songs you can translate per day',
        },
        {
          text: 'Access to playlist features',
          footnote: 'Create and manage your playlists',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'For project supporters',
      quota: 50,
      features: [
        {
          text: 'Unlimited access to songs',
          footnote: '',
        },
        {
          text: 'Access to the song gallery',
          footnote: '',
        },
        {
          text: '50 song translations per day',
          footnote: 'The maximum number of songs you can translate per day',
        },
        {
          text: 'Access to playlist features',
          footnote: 'Create and manage your playlists',
        },
      ],
    },
  ]

  return (
    <div className='mx-10 grid grid-cols-1 gap-10 py-10 text-center lg:grid-cols-2'>
      <TooltipProvider>
        {pricingPlans.map(({ plan, tagline, quota, features }) => {
          const price =
            PLANS.find((p) => p.slug === plan.toLowerCase())?.price.amount || 0

          return (
            <div
              key={plan}
              className={cn(
                'relative rounded-2xl bg-secondary-500 bg-opacity-20 shadow-lg',
                {
                  'border-2 border-secondary shadow-secondary-500':
                    plan === 'Pro',
                  'border border-gray-200': plan !== 'Pro',
                },
              )}>
              {plan === 'Pro' && (
                <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r  from-primary-500 to-secondary  px-3 py-2 text-sm font-medium text-white'>
                  Upgrade now
                </div>
              )}

              <div className='p-5'>
                <h3 className='font-display my-3 text-center text-3xl font-bold text-secondary'>
                  {plan}
                </h3>
                <p className='text-white'>{tagline}</p>
                <p className='font-display my-5 text-6xl font-semibold text-secondary'>
                  ${price}
                </p>
                <p className='text-white'>
                  {price == 0 ? 'Free To Use' : 'One-time Payment'}
                </p>
              </div>

              <div className='flex h-20 items-center justify-center border-b border-t border-primary bg-secondary-500'>
                <div className='flex items-center space-x-1 text-white'>
                  <p>{quota.toLocaleString()} Songs/mo included</p>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger className='ml-1.5 cursor-default'>
                      <HelpCircle className='text-white-500 h-4 w-4' />
                    </TooltipTrigger>
                    <TooltipContent className='w-80 p-2'>
                      How many songs you can translate per month
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <ul className='my-10 space-y-5 px-8'>
                {features.map(({ text, footnote, negative }) => (
                  <li key={text} className='flex space-x-5'>
                    <div className='flex-shrink-0'>
                      {negative ? (
                        <Minus className='h-6 w-6 text-white' />
                      ) : (
                        <Check className='h-6 w-6 text-white' />
                      )}
                    </div>
                    {footnote ? (
                      <div className='flex items-center space-x-1'>
                        <p
                          className={cn('text-white', {
                            'text-white': negative,
                          })}>
                          {text}
                        </p>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className='ml-1.5 cursor-default'>
                            <HelpCircle className='h-4 w-4 text-white' />
                          </TooltipTrigger>
                          <TooltipContent className='w-80 p-2'>
                            {footnote}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <p
                        className={cn('text-white', {
                          'text-gray-400': negative,
                        })}>
                        {text}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              {/* separator */}
              <div className='border-t border-gray-200' />
              <div className='p-5'>
                {plan === 'Free' ? (
                  <Button
                    className={buttonVariants({
                      className: 'w-full cursor-pointer',
                      variant: 'secondary',
                    })}>
                    Sign Up
                    <ArrowRight className='ml-1.5 h-5 w-5' />
                  </Button>
                ) : plan === 'Pro' ? (
                  <Button className='w-full cursor-pointer'>
                    Upgrade Now
                    <ArrowRight className='ml-1.5 h-5 w-5' />
                  </Button>
                ) : (
                  <Button className='w-full cursor-pointer'>
                    Sign Up
                    <ArrowRight className='ml-1.5 h-5 w-5' />
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </TooltipProvider>
    </div>
  )
}
export default PricingTable
