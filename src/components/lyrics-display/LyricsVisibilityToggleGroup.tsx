import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  fontSizeMultiplierAtom,
  lyricsVisibilityAtom,
  romajiVisibilityAtom,
  translationIsEnglishAtom,
  translationVisibilityAtom,
  userInteractedWithSettingsAtom,
} from '@/context/atoms'
import LyricsIcon from '@mui/icons-material/Lyrics'
import TranslateIcon from '@mui/icons-material/Translate'
import { useAtom, useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'

const LyricsVisibilityToggleGroup: React.FC = () => {
  const [lyricsToggleValues, setLyricsToggleValues] = useState<string[]>([
    'lyrics',
    'romaji',
    'translation',
    'translationLanguage',
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
  const [isTranslationVisible, setTranslationVisible] = useAtom(
    translationVisibilityAtom,
  )
  const [isTranslationEnglish, setTranslationIsEnglish] = useAtom(
    translationIsEnglishAtom,
  )

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

  const getButtonStyle = (buttonId: string) => {
    const isHovered = hoveredButton === buttonId
    const isActive = lyricsToggleValues.includes(buttonId)
    const isTranslationLanguageButton = buttonId === 'translationLanguage'

    return {
      opacity: isTranslationLanguageButton
        ? 1
        : isActive
          ? 1
          : isHovered
            ? 0.8
            : 0.6,
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      transition:
        'opacity 0.15s ease-in-out, transform 0.15s ease-in-out, background-color 0.15s ease-in-out',
    }
  }

  return (
    <div className='absolute bottom-full left-1/2 mb-4 flex -translate-x-1/2 transform flex-col-reverse space-x-2'>
      <ToggleGroup
        type='multiple'
        value={lyricsToggleValues}
        onValueChange={handleLyricsToggle}
        className='flex space-x-2'>
        <ToggleGroupItem
          value='translationLanguage'
          onClick={handleTranslationLanguageToggle}
          variant={'default'}
          aria-label='Toggle translation language'
          className=' h-10 w-10 text-pretty rounded-lg bg-primary text-white'
          onMouseEnter={() => handleButtonHover('translationLanguage')}
          onMouseLeave={handleButtonLeave}
          style={getButtonStyle('translationLanguage')}>
          {isTranslationEnglish ? (
            <h1 className='text-xl '>Aa</h1>
          ) : (
            <h1 className='text-xl font-extrabold '>中</h1>
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
      </ToggleGroup>
      <div className='flex items-center justify-center pb-2'>
        <span className='mr-2 text-sm font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
          A
        </span>
        <Slider
          className='w-32'
          min={0.5}
          max={1}
          step={0.01}
          value={[fontSizeMultiplier]}
          onValueChange={handleFontSizeChange}
        />
        <span className='ml-2 text-xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>
          A
        </span>
      </div>
    </div>
  )
}

export default LyricsVisibilityToggleGroup
