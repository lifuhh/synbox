import TopBar from '@/components/shared/TopBar'
import { useAppContext } from '@/context/AppContext'
import { fullscreenAtom, globalControlsVisibilityAtom } from '@/context/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: React.FC = () => {
  const { playerControlsVisible } = useAppContext()
  const globalControlsVisible = useAtomValue(globalControlsVisibilityAtom)
  const isFullscreen = useAtomValue(fullscreenAtom)

  const shouldHideCursor = globalControlsVisible && !playerControlsVisible

  return (
    <div className='relative min-h-screen w-full'>
      {/* Background visual container */}
      <div className='fixed inset-0 isolate overflow-hidden'>
        {/* Top-left polygon */}
        <div
          aria-hidden='true'
          className='top-30 pointer-events-none absolute -left-40 -z-10 transform-gpu overflow-hidden blur-3xl'>
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative aspect-[1155/678] w-[40rem] rotate-[80deg] bg-gradient-to-tr from-[#CA195F] to-[#ff87b5] opacity-20'
          />
        </div>
        {/* Bottom-right polygon */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -bottom-40 right-10 -z-10 transform-gpu overflow-hidden blur-3xl'>
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative aspect-[1155/678] w-[80rem] -rotate-[30deg] bg-gradient-to-tr from-[#E74E8A] to-[#CA195F] opacity-15'
          />
        </div>
      </div>

      {/* Main content */}
      <div
        className={`relative h-screen w-full ${shouldHideCursor ? 'cursor-none' : ''}`}>
        {!isFullscreen && <TopBar />}
        <section className='-my-14 flex h-full flex-1 bg-background/20'>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default RootLayout
