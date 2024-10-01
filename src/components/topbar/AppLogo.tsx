import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SynboxLogo } from '../svgicons'

const AppLogo: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (location.pathname === '/') {
      // Find the LandingPage component and scroll it to the top
      const landingPage = document.querySelector(
        '.anchor-for-top-scroll',
      ) as HTMLElement
      if (landingPage) {
        landingPage.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      navigate('/')
    }
  }

  return (
    <div className='z-20 flex w-48 min-w-48 cursor-pointer justify-start pt-2 align-middle'>
      <Link to='/' onClick={handleOnClick}>
        <button aria-label='Home Button'>
          <SynboxLogo />
        </button>
      </Link>
    </div>
  )
}

export default AppLogo
