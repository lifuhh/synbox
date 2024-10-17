import { cn } from '@/utils/cn'
import { CheckCircle, Loader } from 'lucide-react'

export interface Step {
  id: string
  title: string
  status: 'pending' | 'active' | 'completed'
}

interface ProgressUpdateProps {
  steps: Step[]
}

export function ProgressUpdate({ steps }: ProgressUpdateProps) {
  return (
    <div className='flex-col space-y-8'>
      {steps.map((step, index) => (
        <div key={step.id} className='flex items-center space-x-4'>
          <div className='flex-shrink-0'>
            {step.status === 'completed' && (
              <CheckCircle className='h-5 w-5 text-green-500' />
            )}
            {step.status === 'active' && (
              <Loader className='text-white-500 h-5 w-5 animate-spin' />
            )}
            {step.status === 'pending' && (
              <div className='h-5 w-5 rounded-full border-2 border-gray-300' />
            )}
          </div>
          <div className='flex-grow'>
            <p
              className={cn(
                'text-sm font-medium',
                step.status === 'completed' && 'text-green-500',
                step.status === 'active' && 'text-white-500',
                step.status === 'pending' && 'text-gray-500',
              )}>
              {step.title}
            </p>
          </div>
          {/* {index < steps.length - 1 && (
            <div className='mx-3 h-10 w-px flex-shrink-0 bg-gray-200' />
          )} */}
        </div>
      ))}
    </div>
  )
}
