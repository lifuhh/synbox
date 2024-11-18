import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  ToastAction,
  ToastProvider,
  ToastViewport,
} from '@/components/ui/toast'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'

import { LyricsVisibilityControlButton } from './LyricsVisibilityControlButton'

import {
  addFavoriteAtom,
  currentVideoAtom,
  favoritesAtom,
  fontSizeMultiplierAtomWithPersistence,
  isFavoriteAtom,
  lyricsControlVisibilityAtom,
  lyricsDisplayBottomAtom,
  lyricsVisibilityAtom,
  removeFavoriteAtom,
  romajiVisibilityAtom,
  translationIsEnglishAtom,
  translationVisibilityAtom,
} from '@/context/atoms'
import { Divider } from '@mantine/core'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LyricsVisibilityToggleGroup = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(true)
  const [hoveredButton, setHoveredButton] = useState(null)

  const [fontSizeMultiplier, setFontSizeMultiplier] = useAtom(
    fontSizeMultiplierAtomWithPersistence,
  )

  const [currentVideo] = useAtom(currentVideoAtom)
  const [favorites] = useAtom(favoritesAtom)
  const [, addFavorite] = useAtom(addFavoriteAtom)
  const [, removeFavorite] = useAtom(removeFavoriteAtom)
  const [isFavorite] = useAtom(isFavoriteAtom)

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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: 'Copied URL to clipboard',
        duration: 1500,
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy link to clipboard',
        variant: 'destructive',
        duration: 2000,
      })
    }
  }

  const handleBookmark = () => {
    if (!currentVideo) return

    if (isFavorite(currentVideo.videoId)) {
      const videoToRemove = currentVideo
      removeFavorite(currentVideo.videoId)

      toast({
        description: 'Removed Bookmark',
        action: (
          <ToastAction
            altText='Undo removal'
            onClick={() => {
              addFavorite(videoToRemove)
              // toast({
              //   title: 'Restored Bookmark',
              //   duration: 1500,
              // })
            }}>
            Undo
          </ToastAction>
        ),
        duration: 5000,
      })
    } else {
      const videoToAdd = currentVideo
      addFavorite(videoToAdd)

      toast({
        description: 'Added to Bookmarks',
        action: (
          <ToastAction
            altText='Undo add'
            onClick={() => {
              removeFavorite(videoToAdd.videoId)
              // toast({
              //   title: 'Bookmark Removed',
              //   duration: 1500,
              // })
            }}>
            Undo
          </ToastAction>
        ),
        duration: 5000,
      })
    }
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

  const handleLyricsToggle = (values) => {
    const newLyricsVisible = values.includes('lyrics')
    const newRomajiVisible = values.includes('romaji')
    const newTranslationVisible = values.includes('translation')

    setLyricsVisible(newLyricsVisible)
    setRomajiVisible(newRomajiVisible)
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

    // Special handling for bookmark button when currentVideo doesn't exist
    if (buttonId === 'bookmarkButton' && !currentVideo) {
      return {
        opacity: 0.3, // Matches disabled button opacity
        cursor: 'not-allowed',
        transform: 'scale(1)',
        transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
      }
    }

    return {
      opacity: isExcludedButton || isActive ? 1 : isHovered ? 0.6 : 0.4,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    }
  }

  return (
    <ToastProvider>
      <div className='fixed left-0 top-1/2 z-50 -translate-y-1/2 transform'>
        <div
          className={`flex transform items-center transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-2.5rem)]'
          }`}>
          <div className='flex items-center space-x-4 p-4'>
            <TooltipProvider delayDuration={190}>
              <div className='flex cursor-pointer flex-col space-y-4'>
                <ToggleGroup
                  type='multiple'
                  value={lyricsToggleValues}
                  onValueChange={handleLyricsToggle}
                  className='flex flex-col space-y-2'>
                  <LyricsVisibilityControlButton
                    id='returnHomeButton'
                    value='returnHomeButton'
                    onClick={handleHomeButtonClick}
                    isActive={lyricsToggleValues.includes('returnHomeButton')}
                    isHovered={hoveredButton === 'returnHomeButton'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />

                  <Divider size='sm' className='w-full border-primary' />

                  <LyricsVisibilityControlButton
                    id='translationLanguage'
                    value='translationLanguage'
                    onClick={handleTranslationLanguageToggle}
                    isActive={lyricsToggleValues.includes(
                      'translationLanguage',
                    )}
                    isHovered={hoveredButton === 'translationLanguage'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />

                  <LyricsVisibilityControlButton
                    id='translation'
                    value='translation'
                    isActive={lyricsToggleValues.includes('translation')}
                    isHovered={hoveredButton === 'translation'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />

                  <LyricsVisibilityControlButton
                    id='lyrics'
                    value='lyrics'
                    isActive={lyricsToggleValues.includes('lyrics')}
                    isHovered={hoveredButton === 'lyrics'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />

                  <LyricsVisibilityControlButton
                    id='romaji'
                    value='romaji'
                    isActive={lyricsToggleValues.includes('romaji')}
                    isHovered={hoveredButton === 'romaji'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />

                  <LyricsVisibilityControlButton
                    id='lyricsPosition'
                    value='lyricsPosition'
                    onClick={handleLyricsPositionToggle}
                    isActive={lyricsToggleValues.includes('lyricsPosition')}
                    isHovered={hoveredButton === 'lyricsPosition'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />

                  <Divider size='sm' className='w-full border-primary' />

                  <LyricsVisibilityControlButton
                    id='bookmarkButton'
                    value='bookmarkButton'
                    onClick={handleBookmark}
                    isActive={lyricsToggleValues.includes('bookmarkButton')}
                    isHovered={hoveredButton === 'bookmarkButton'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />

                  <LyricsVisibilityControlButton
                    id='shareButton'
                    value='shareButton'
                    onClick={handleShare}
                    isActive={lyricsToggleValues.includes('shareButton')}
                    isHovered={hoveredButton === 'shareButton'}
                    currentVideo={currentVideo}
                    isFavorite={isFavorite}
                    isLyricsDisplayBottom={isLyricsDisplayBottom}
                    isTranslationEnglish={isTranslationEnglish}
                    isRomajiVisible={isRomajiVisible}
                    isLyricsVisible={isLyricsVisible}
                    isTranslationVisible={isTranslationVisible}
                  />
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
      <ToastViewport />
    </ToastProvider>
  )
}

export default LyricsVisibilityToggleGroup
