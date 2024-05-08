import { useEffect } from 'react'

// Hook to check if the text overflows its container
export function useOverflow(textRef, containerRef, overflowClass) {
  useEffect(() => {
    const checkIfOverflows = () => {
      const textWidth = textRef.current?.offsetWidth ?? 0
      const containerWidth = containerRef.current?.offsetWidth ?? 0
      if (textWidth > containerWidth) {
        containerRef.current?.classList.add(overflowClass)
      } else {
        containerRef.current?.classList.remove(overflowClass)
      }
    }

    // Check once on mount
    checkIfOverflows()
  }, [textRef, containerRef, overflowClass])
}
