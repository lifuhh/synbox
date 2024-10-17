import { cn } from '@/utils/cn'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // className={cn('bg-muted animate-pulse rounded-md', className)}
      className={cn('animate-pulse rounded-md bg-secondary', className)}
      {...props}
    />
  )
}

export { Skeleton }
