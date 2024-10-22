import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  fontSizeMultiplierAtom,
  lyricsControlVisibilityAtom,
  lyricsDisplayBottomAtom,
  lyricsVisibilityAtom,
  romajiVisibilityAtom,
  translationIsEnglishAtom,
  translationVisibilityAtom,
} from '@/context/atoms'
import LyricsIcon from '@mui/icons-material/Lyrics'
import TranslateIcon from '@mui/icons-material/Translate'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

const LyricsVisibilityToggleGroup: React.FC = () => {
  const [lyricsToggleValues, setLyricsToggleValues] = useState<string[]>([
    'lyrics',
    'romaji',
    'translation',
    'translationLanguage',
    'lyricsPosition',
  ])

  // const userInteractedWithSettings = useAtomValue(
  //   userInteractedWithSettingsAtom,
  // )

  const [fontSizeMultiplier, setFontSizeMultiplier] = useAtom(
    fontSizeMultiplierAtom,
  )
  const handleFontSizeChange = (value: number[]) => {
    setFontSizeMultiplier(value[0])
  }

  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

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

  const handleLyricsPositionToggle = () => {
    setIsLyricsDisplayBottom(!isLyricsDisplayBottom)
  }

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

  const handleLyricsToggle = (values: string[]) => {
    const newLyricsVisible = values.includes('lyrics')
    const newRomajiVisible = values.includes('romaji')
    const newTranslationVisible = values.includes('translation')

    // If lyrics visibility is changing
    if (newLyricsVisible !== isLyricsVisible) {
      setLyricsVisible(newLyricsVisible)
      // If lyrics are being turned on or off, sync romaji
      setRomajiVisible(newLyricsVisible)
    } else {
      // If lyrics visibility isn't changing, update romaji independently
      setRomajiVisible(newRomajiVisible)
    }

    setTranslationVisible(newTranslationVisible)
  }

  const handleTranslationLanguageToggle = () => {
    setTranslationIsEnglish(!isTranslationEnglish)
  }

  const handleButtonHover = (buttonId: string) => {
    setHoveredButton(buttonId)
  }

  const handleButtonLeave = (buttonId: string) => {
    if (!document.querySelector(`:hover > [data-tooltip-id="${buttonId}"]`)) {
      setHoveredButton(null)
    }
  }

  const excludedButtons = ['translationLanguage', 'lyricsPosition']

  const getButtonStyle = (buttonId: string) => {
    const isHovered = hoveredButton === buttonId
    const isActive = lyricsToggleValues.includes(buttonId)
    const isExcludedButton = excludedButtons.includes(buttonId)

    return {
      opacity: isExcludedButton || isActive ? 1 : isHovered ? 0.6 : 0.4,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    }
  }

  const [lyricsControlVisible] = useAtom(lyricsControlVisibilityAtom)

  if (!lyricsControlVisible) {
    return null
  }

  return (
    <TooltipProvider delayDuration={190}>
      <div className='fixed left-4 top-1/2 flex -translate-y-1/2 transform items-center space-x-4 transition-opacity duration-200'>
        <ToggleGroup
          type='multiple'
          value={lyricsToggleValues}
          onValueChange={handleLyricsToggle}
          className='flex flex-col space-y-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value='translationLanguage'
                onClick={handleTranslationLanguageToggle}
                variant='default'
                aria-label='Toggle translation language'
                className='invisible-ring h-10 w-10 rounded-lg bg-primary text-white'
                onMouseEnter={() => handleButtonHover('translationLanguage')}
                onMouseLeave={() => handleButtonLeave('translationLanguage')}
                data-tooltip-id='translationLanguage'
                style={getButtonStyle('translationLanguage')}>
                {isTranslationEnglish ? (
                  <h1 className='text-xl'>Aa</h1>
                ) : (
                  <h1 className='text-xl font-extrabold'>中</h1>
                )}
                <span className='unselectable sr-only'>
                  {isTranslationEnglish
                    ? 'View Chinese Translations'
                    : 'View English Translations'}
                </span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              align='start'
              sideOffset={6}
              alignOffset={-2}
              className='unhighlightable border-none bg-primary'
              onMouseEnter={() => handleButtonHover('translationLanguage')}
              onMouseLeave={() => handleButtonLeave('translationLanguage')}>
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
                className='invisible-ring h-10 w-10 rounded-lg bg-primary bg-opacity-100 data-[state=off]:bg-secondary/10 data-[state=off]:bg-opacity-10'
                onMouseEnter={() => handleButtonHover('translation')}
                onMouseLeave={() => handleButtonLeave('translation')}
                data-tooltip-id='translation'
                style={getButtonStyle('translation')}>
                <TranslateIcon sx={{ fontSize: 24 }} />
                <span className='sr-only'>
                  {' '}
                  {isTranslationVisible
                    ? 'Hide Translations'
                    : 'Show Translations'}
                </span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent
              hideWhenDetached={true}
              side='right'
              align='start'
              sideOffset={6}
              alignOffset={-2}
              onMouseEnter={() => handleButtonHover('translation')}
              onMouseLeave={() => handleButtonLeave('translation')}
              className='unhighlightable border-none bg-primary'>
              {isTranslationVisible ? 'Hide Translations' : 'Show Translations'}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value='lyrics'
                aria-label='Toggle lyrics'
                className='invisible-ring h-10 w-10 rounded-lg bg-primary bg-opacity-100 data-[state=off]:bg-secondary/10 data-[state=off]:bg-opacity-10'
                onMouseEnter={() => handleButtonHover('lyrics')}
                onMouseLeave={() => handleButtonLeave('lyrics')}
                data-tooltip-id='lyrics'
                style={getButtonStyle('lyrics')}>
                <LyricsIcon sx={{ fontSize: 24 }} />
                <span className='sr-only'>
                  {isLyricsVisible ? 'Hide Lyrics' : 'Show Lyrics'}
                </span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              align='start'
              sideOffset={6}
              onMouseEnter={() => handleButtonHover('lyrics')}
              onMouseLeave={() => handleButtonLeave('lyrics')}
              alignOffset={-2}
              className='unhighlightable border-none bg-primary'>
              {isLyricsVisible ? 'Hide Lyrics' : 'Show Lyrics'}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value='romaji'
                aria-label='Toggle romaji'
                className='invisible-ring h-10 w-10 rounded-lg bg-primary bg-opacity-100 data-[state=off]:bg-secondary/10 data-[state=off]:bg-opacity-10'
                onMouseEnter={() => handleButtonHover('romaji')}
                onMouseLeave={() => handleButtonLeave('romaji')}
                data-tooltip-id='romaji'
                style={getButtonStyle('romaji')}>
                <h1 className='text-xl'>R</h1>
                <span className='sr-only'>
                  {isRomajiVisible ? 'Hide Romaji' : 'Show Romaji'}
                </span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              align='start'
              onMouseEnter={() => handleButtonHover('romaji')}
              onMouseLeave={() => handleButtonLeave('romaji')}
              sideOffset={6}
              alignOffset={-2}
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
                className='invisible-ring h-10 w-10 rounded-lg bg-primary text-white'
                onMouseEnter={() => handleButtonHover('lyricsPosition')}
                onMouseLeave={() => handleButtonLeave('lyricsPosition')}
                data-tooltip-id='lyricsPosition'
                style={getButtonStyle('lyricsPosition')}>
                {isLyricsDisplayBottom ? (
                  <VerticalAlignTopIcon />
                ) : (
                  <VerticalAlignBottomIcon />
                )}
                <span className='sr-only'>
                  {' '}
                  {isLyricsDisplayBottom
                    ? 'Align Lyrics Top'
                    : 'Align Lyrics Bottom'}
                </span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              align='start'
              sideOffset={6}
              alignOffset={-2}
              onMouseEnter={() => handleButtonHover('lyricsPosition')}
              onMouseLeave={() => handleButtonLeave('lyricsPosition')}
              className='unhighlightable border-none bg-primary'>
              {isLyricsDisplayBottom
                ? 'Align Lyrics Top'
                : 'Align Lyrics Bottom'}
            </TooltipContent>
          </Tooltip>
        </ToggleGroup>
        <div className='flex h-56 flex-col items-center justify-center space-y-2'>
          <span className='unselectable text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
            A
          </span>

          <Slider
            className='V cursor-pointer rounded-lg'
            min={0.5}
            max={1}
            step={0.01}
            value={[fontSizeMultiplier]}
            onValueChange={handleFontSizeChange}
            orientation='vertical'
          />
          <span className='unselectable text-sm font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
            A
          </span>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default LyricsVisibilityToggleGroup
