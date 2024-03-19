import { useEffect } from 'react'

// Hook to use in components that need to lock scroll on hover
export const useLockBodyScrollOnHover = (
  ref: React.RefObject<HTMLElement>,
  breakpointWidth: number
) => {
  useEffect(() => {
    const preventScroll = (event: WheelEvent): void => {
      event.preventDefault()
    }

    const enableScrollLock = (): void => {
      window.addEventListener('wheel', preventScroll, { passive: false })
    }

    const disableScrollLock = (): void => {
      window.removeEventListener('wheel', preventScroll)
    }

    const checkWidthAndDisableScrollLock = (): void => {
      if (window.innerWidth <= breakpointWidth) {
        disableScrollLock()
      }
    }

    const node = ref.current

    if (node) {
      node.addEventListener('mouseenter', enableScrollLock)
      node.addEventListener('mouseleave', disableScrollLock)
      window.addEventListener('resize', checkWidthAndDisableScrollLock)

      // Ensure scroll lock is disabled when the component is unmounted or the user navigates away
      return () => {
        disableScrollLock() // Clean up the scroll lock
        node.removeEventListener('mouseenter', enableScrollLock)
        node.removeEventListener('mouseleave', disableScrollLock)
        window.removeEventListener('resize', checkWidthAndDisableScrollLock)
      }
    }
  }, [ref, breakpointWidth]) // Ensure the effect runs again if the ref changes
}
