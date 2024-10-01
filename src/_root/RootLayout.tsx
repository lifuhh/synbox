import TopBar from '@/components/shared/TopBar'
import { useAppContext } from '@/context/AppContext'
import { globalControlsVisibilityAtom } from '@/context/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Outlet, useMatch } from 'react-router-dom'

const RootLayout: React.FC = () => {
  const { playerControlsVisible } = useAppContext()
  const globalControlsVisible = useAtomValue(globalControlsVisibilityAtom)

  const isHomePage = useMatch('/')
  const isVideoPage = useMatch('/v/:videoId')

  const shouldHideCursor = globalControlsVisible && !playerControlsVisible

  return (
    <div
      className={`relative h-screen w-full ${shouldHideCursor ? 'cursor-none' : ''}`}>
      <div className='absolute left-0 right-0 top-0 z-50'>
        <TopBar />
      </div>
      <main className='h-full w-full overflow-hidden'>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
