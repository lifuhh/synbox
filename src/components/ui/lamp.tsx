'use client'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import React from 'react'

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl'>
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  )
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'relative z-0 flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden rounded-md',
        className,
      )}>
      <div className='relative isolate z-0 flex w-full flex-1 scale-y-150 items-center justify-center'>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className='bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-[rgba(235,0,128,0.8)] via-[rgba(255,0,128,0)] to-[rgba(255,0,128,0)] text-white [--conic-position:from_70deg_at_center_top]'>
          <div className='absolute bottom-0 left-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]' />
          <div className='absolute bottom-0 left-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_right,white,transparent)]' />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className='bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-[rgba(255,0,128,0)] via-[rgba(255,0,128,0)] to-[rgba(235,0,128,0.8)] text-white [--conic-position:from_290deg_at_center_top]'>
          <div className='absolute bottom-0 right-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_left,white,transparent)]' />
          <div className='absolute bottom-0 right-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]' />
        </motion.div>

        <div className='absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl'></div>
        <div className='absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md'></div>
        <div className='absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[rgba(235,0,128,0.3)] opacity-50 blur-3xl'></div>
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[rgba(235,0,128,0.5)] blur-2xl'></motion.div>
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-[rgba(235,0,128,0.6)]'></motion.div>

        <div className='absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]'></div>
      </div>

      <div className='relative z-50 flex -translate-y-80 flex-col items-center px-5'>
        {children}
      </div>
    </div>
  )
}
