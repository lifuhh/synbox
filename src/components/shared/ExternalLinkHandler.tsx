import React, { useEffect } from 'react'

const ExternalLinkHandler = ({ children }) => {
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest('a')
      if (
        target &&
        target.href &&
        !target.href.startsWith(window.location.origin)
      ) {
        event.preventDefault()
        window.open(target.href, '_blank', 'noopener,noreferrer')
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return <>{children}</>
}

export default ExternalLinkHandler
