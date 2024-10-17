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
    <div
      className={`relative h-screen w-full ${shouldHideCursor ? 'cursor-none' : ''}`}>
      {!isFullscreen && <TopBar />}
      <section className='-my-14 flex h-full flex-1'>
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
