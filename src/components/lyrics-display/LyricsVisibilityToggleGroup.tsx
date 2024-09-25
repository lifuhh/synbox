import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
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

  const handleButtonLeave = () => {
    setHoveredButton(null)
  }

  const excludedButtons = ['translationLanguage', 'lyricsPosition']

  const getButtonStyle = (buttonId: string) => {
    const isHovered = hoveredButton === buttonId
    const isActive = lyricsToggleValues.includes(buttonId)
    const isExcludedButton = excludedButtons.includes(buttonId)

    return {
      opacity: isExcludedButton ? 1 : isActive ? 1 : isHovered ? 0.8 : 0.6,
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      transition:
        'opacity 0.15s ease-in-out, transform 0.15s ease-in-out, background-color 0.15s ease-in-out',
    }
  }

  const [lyricsControlVisible] = useAtom(lyricsControlVisibilityAtom)

  if (!lyricsControlVisible) {
    return null
  }

  return (
    <div className='fixed left-4 top-1/2 flex -translate-y-1/2 transform items-center space-x-4'>
      <ToggleGroup
        type='multiple'
        value={lyricsToggleValues}
        onValueChange={handleLyricsToggle}
        className='flex flex-col space-y-2'>
        <ToggleGroupItem
          value='translationLanguage'
          onClick={handleTranslationLanguageToggle}
          variant='default'
          aria-label='Toggle translation language'
          className='h-10 w-10 rounded-lg bg-primary text-white'
          onMouseEnter={() => handleButtonHover('translationLanguage')}
          onMouseLeave={handleButtonLeave}
          style={getButtonStyle('translationLanguage')}>
          {isTranslationEnglish ? (
            <h1 className='text-xl'>Aa</h1>
          ) : (
            <h1 className='text-xl font-extrabold'>中</h1>
          )}
          <span className='sr-only'>Toggle Translation Language</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value='translation'
          aria-label='Toggle translation'
          className='h-10 w-10 rounded-lg bg-primary/40 bg-opacity-70 data-[state=on]:bg-primary/100 data-[state=on]:bg-opacity-20'
          onMouseEnter={() => handleButtonHover('translation')}
          onMouseLeave={handleButtonLeave}
          style={getButtonStyle('translation')}>
          <TranslateIcon sx={{ fontSize: 24 }} />
          <span className='sr-only'>Toggle Translation</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value='lyrics'
          aria-label='Toggle lyrics'
          className='h-10 w-10 rounded-lg bg-primary/40 bg-opacity-70 data-[state=on]:bg-primary/100 data-[state=on]:bg-opacity-20'
          onMouseEnter={() => handleButtonHover('lyrics')}
          onMouseLeave={handleButtonLeave}
          style={getButtonStyle('lyrics')}>
          <LyricsIcon sx={{ fontSize: 24 }} />
          <span className='sr-only'>Toggle Lyrics</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value='romaji'
          aria-label='Toggle romaji'
          className='h-10 w-10 rounded-lg bg-primary/40 bg-opacity-70 data-[state=on]:bg-primary/100 data-[state=on]:bg-opacity-20'
          onMouseEnter={() => handleButtonHover('romaji')}
          onMouseLeave={handleButtonLeave}
          style={getButtonStyle('romaji')}>
          <h1 className='text-xl'>R</h1>
          <span className='sr-only'>Toggle Romaji</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value='lyricsPosition'
          onClick={handleLyricsPositionToggle}
          variant='default'
          aria-label='Toggle lyrics position'
          className='h-10 w-10 rounded-lg bg-primary text-white'
          onMouseEnter={() => handleButtonHover('lyricsPosition')}
          onMouseLeave={handleButtonLeave}
          style={getButtonStyle('lyricsPosition')}>
          {isLyricsDisplayBottom ? (
            <VerticalAlignTopIcon />
          ) : (
            <VerticalAlignBottomIcon />
          )}
          <span className='sr-only'>Toggle Lyrics Position</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <div className='flex h-56 flex-col items-center justify-center space-y-2'>
        <span className='text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
          A
        </span>

        <Slider
          className=' rounded-lg'
          min={0.5}
          max={1}
          step={0.01}
          value={[fontSizeMultiplier]}
          onValueChange={handleFontSizeChange}
          orientation='vertical'
        />
        <span className='text-sm font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
          A
        </span>
      </div>
    </div>
  )
}

export default LyricsVisibilityToggleGroup
