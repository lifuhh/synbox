import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import {
  fontSizeMultiplierAtomWithPersistence,
  lyricsControlVisibilityAtom,
  lyricsDisplayBottomAtom,
  lyricsVisibilityAtom,
  romajiVisibilityAtom,
  translationIsEnglishAtom,
  translationVisibilityAtom,
} from '@/context/atoms'
import { Divider } from '@mantine/core'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import LyricsIcon from '@mui/icons-material/Lyrics'
import ReplyIcon from '@mui/icons-material/Reply'
import TranslateIcon from '@mui/icons-material/Translate'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LyricsVisibilityToggleGroup = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const [hoveredButton, setHoveredButton] = useState(null)

  const [fontSizeMultiplier, setFontSizeMultiplier] = useAtom(
    fontSizeMultiplierAtomWithPersistence,
  )

  const [lyricsControlVisible, setLyricsControlVisible] = useAtom(
    lyricsControlVisibilityAtom,
  )

  const [lyricsToggleValues, setLyricsToggleValues] = useState([
    'returnHomeButton',
    'lyrics',
    'romaji',
    'translation',
    'translationLanguage',
    'lyricsPosition',
  ])

  const [isLyricsVisible, setLyricsVisible] = useAtom(lyricsVisibilityAtom)
  const [isRomajiVisible, setRomajiVisible] = useAtom(romajiVisibilityAtom)
  const [isLyricsDisplayBottom, setIsLyricsDisplayBottom] = useAtom(
    lyricsDisplayBottomAtom,
  )
  const [isTranslationVisible, setTranslationVisible] = useAtom(
    translationVisibilityAtom,
  )
  const [isTranslationEnglish, setTranslationIsEnglish] = useAtom(
    translationIsEnglishAtom,
  )

  const handleFontSizeChange = (value) => {
    setFontSizeMultiplier(value[0])
  }

  const handleLyricsPositionToggle = () => {
    setIsLyricsDisplayBottom(!isLyricsDisplayBottom)
  }

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen)
    setLyricsControlVisible(true) // Ensure controls remain visible when drawer is open
  }

  //TODO: Add functionality
  const handleShare = () => {
    //
  }

  const handleBookmark = () => {}

  useEffect(() => {
    setLyricsToggleValues(
      ['lyrics', 'romaji', 'translation'].filter((value) => {
        switch (value) {
          case 'lyrics':
            return isLyricsVisible
          case 'romaji':
            return isRomajiVisible
          case 'translation':
            return isTranslationVisible
          default:
            return false
        }
      }),
    )
  }, [isLyricsVisible, isRomajiVisible, isTranslationVisible])

  const handleLyricsToggle = (values) => {
    const newLyricsVisible = values.includes('lyrics')
    const newRomajiVisible = values.includes('romaji')
    const newTranslationVisible = values.includes('translation')

    if (newLyricsVisible !== isLyricsVisible) {
      setLyricsVisible(newLyricsVisible)
      setRomajiVisible(newLyricsVisible)
    } else {
      setRomajiVisible(newRomajiVisible)
    }

    setTranslationVisible(newTranslationVisible)
  }

  const handleHomeButtonClick = () => {
    navigate('/')
  }

  const handleTranslationLanguageToggle = () => {
    setTranslationIsEnglish(!isTranslationEnglish)
  }

  const excludedButtons = [
    'translationLanguage',
    'lyricsPosition',
    'returnHomeButton',
    'shareButton',
    'bookmarkButton',
  ]

  const getButtonStyle = (buttonId) => {
    const isHovered = hoveredButton === buttonId
    const isActive = lyricsToggleValues.includes(buttonId)
    const isExcludedButton = excludedButtons.includes(buttonId)

    return {
      opacity: isExcludedButton || isActive ? 1 : isHovered ? 0.6 : 0.4,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    }
  }

  return (
    <div className='fixed left-0 top-1/2 z-50 -translate-y-1/2 transform'>
      <div
        className={`flex transform items-center transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-2.5rem)]'
        }`}>
        <div className='flex items-center space-x-4  p-4'>
          <TooltipProvider delayDuration={190}>
            <div className='flex cursor-pointer flex-col space-y-4'>
              <ToggleGroup
                type='multiple'
                value={lyricsToggleValues}
                onValueChange={handleLyricsToggle}
                className='flex flex-col space-y-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='returnHomeButton'
                      onClick={handleHomeButtonClick}
                      variant='default'
                      aria-label='Return home'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary text-white'
                      style={getButtonStyle('returnHomeButton')}>
                      <HomeIcon sx={{ fontSize: 24 }} />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {'Return to Home Page'}
                  </TooltipContent>
                </Tooltip>

                <Divider size='sm' className='w-full border-primary' />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='translationLanguage'
                      onClick={handleTranslationLanguageToggle}
                      variant='default'
                      aria-label='Toggle translation language'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary text-white'
                      style={getButtonStyle('translationLanguage')}>
                      {isTranslationEnglish ? (
                        <h1 className='text-xl'>EN</h1>
                      ) : (
                        <h1 className='text-xl font-extrabold'>中</h1>
                      )}
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {isTranslationEnglish
                      ? 'View Chinese Translations'
                      : 'View English Translations'}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='translation'
                      aria-label='Toggle translation'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary bg-opacity-100 data-[state=off]:bg-secondary/10'
                      style={getButtonStyle('translation')}>
                      <TranslateIcon sx={{ fontSize: 24 }} />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {isTranslationVisible
                      ? 'Hide Translations'
                      : 'Show Translations'}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='lyrics'
                      aria-label='Toggle lyrics'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary bg-opacity-100 data-[state=off]:bg-secondary/10'
                      style={getButtonStyle('lyrics')}>
                      <LyricsIcon sx={{ fontSize: 24 }} />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {isLyricsVisible ? 'Hide Lyrics' : 'Show Lyrics'}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='romaji'
                      aria-label='Toggle romaji'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary bg-opacity-100 data-[state=off]:bg-secondary/10'
                      style={getButtonStyle('romaji')}>
                      <h1 className='text-xl'>R</h1>
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {isRomajiVisible ? 'Hide Romaji' : 'Show Romaji'}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='lyricsPosition'
                      onClick={handleLyricsPositionToggle}
                      variant='default'
                      aria-label='Toggle lyrics position'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary text-white'
                      style={getButtonStyle('lyricsPosition')}>
                      {isLyricsDisplayBottom ? (
                        <VerticalAlignTopIcon />
                      ) : (
                        <VerticalAlignBottomIcon />
                      )}
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {isLyricsDisplayBottom
                      ? 'Align Lyrics Top'
                      : 'Align Lyrics Bottom'}
                  </TooltipContent>
                </Tooltip>

                <Divider size='sm' className='w-full border-primary' />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='bookmarkButton'
                      onClick={handleShare}
                      variant='default'
                      aria-label='Return home'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary text-white'
                      style={getButtonStyle('bookmarkButton')}>
                      <BookmarkBorderIcon
                        sx={{
                          fontSize: 24,
                          transform: 'scaleX(-1) rotate(0deg)',
                          transformOrigin: 'center',
                        }}
                      />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {'Add to Favourites'}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value='shareButton'
                      onClick={handleBookmark}
                      variant='default'
                      aria-label='Return home'
                      className='invisible-ring h-10 w-10 cursor-pointer rounded-lg bg-primary text-white'
                      style={getButtonStyle('shareButton')}>
                      <ReplyIcon
                        sx={{
                          fontSize: 24,
                          transform: 'scaleX(-1) rotate(0deg)',
                          transformOrigin: 'center',
                        }}
                      />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    align='start'
                    sideOffset={6}
                    alignOffset={-4}
                    className='unhighlightable border-none bg-primary'>
                    {'Copy URL'}
                  </TooltipContent>
                </Tooltip>
              </ToggleGroup>
            </div>
          </TooltipProvider>
        </div>
        <div className='flex h-56 flex-col items-center justify-center space-y-2'>
          <span className='unselectable text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
            A
          </span>
          <Slider
            className='V cursor-pointer rounded-lg'
            min={0.4}
            max={1.6}
            step={0.01}
            value={[fontSizeMultiplier]}
            onValueChange={handleFontSizeChange}
            orientation='vertical'
          />
          <span className='unselectable text-sm font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
            A
          </span>
        </div>
        {/* Toggle button */}
        <Button
          variant='ghost'
          onClick={handleToggleDrawer}
          className='ml-1 h-10 w-10 transition-transform duration-300 hover:scale-110 hover:bg-transparent hover:outline-primary'>
          <KeyboardDoubleArrowUpIcon
            className={`transform stroke-primary stroke-1 transition-transform duration-300 ${
              isOpen ? '-rotate-90' : 'rotate-90'
            }`}
          />
        </Button>
      </div>
    </div>
  )
}

export default LyricsVisibilityToggleGroup
