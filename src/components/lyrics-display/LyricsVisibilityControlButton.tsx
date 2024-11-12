import { ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import HomeIcon from '@mui/icons-material/Home'
import LyricsIcon from '@mui/icons-material/Lyrics'
import ReplyIcon from '@mui/icons-material/Reply'
import TranslateIcon from '@mui/icons-material/Translate'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'
import React from 'react'

type ButtonId =
  | 'returnHomeButton'
  | 'translationLanguage'
  | 'translation'
  | 'lyrics'
  | 'romaji'
  | 'lyricsPosition'
  | 'bookmarkButton'
  | 'shareButton'

interface ButtonState {
  currentVideo?: {
    videoId: string
  } | null
  isFavorite: (videoId: string) => boolean
  isLyricsDisplayBottom: boolean
  isTranslationEnglish: boolean
  isRomajiVisible: boolean
  isLyricsVisible: boolean
  isTranslationVisible: boolean
}

interface ButtonProps extends ButtonState {
  id: ButtonId
  value: string
  onClick?: () => void
  isActive: boolean
  isHovered: boolean
}

interface ButtonConfigProps extends ButtonState {
  id: ButtonId
  isActive: boolean
  isHovered: boolean
}

const BASE_STYLES = 'invisible-ring h-10 w-10 cursor-pointer rounded-lg'

const EXCLUDED_BUTTONS: ButtonId[] = [
  'translationLanguage',
  'lyricsPosition',
  'returnHomeButton',
  'shareButton',
  'bookmarkButton',
]

const getButtonProps = ({
  id,
  isActive,
  isHovered,
  currentVideo,
  isFavorite,
  isLyricsDisplayBottom,
  isTranslationEnglish,
  isRomajiVisible,
  isLyricsVisible,
  isTranslationVisible,
}: ButtonConfigProps) => {
  const isDisabled = id === 'bookmarkButton' && !currentVideo

  const baseConfig = {
    className: `${BASE_STYLES} ${
      isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
    } ${
      !EXCLUDED_BUTTONS.includes(id)
        ? 'bg-primary bg-opacity-100 data-[state=off]:bg-secondary/10'
        : 'bg-primary text-white'
    }`,
    style: {
      opacity: isDisabled
        ? 0.3
        : EXCLUDED_BUTTONS.includes(id) || isActive
          ? 1
          : isHovered
            ? 0.6
            : 0.4,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
    disabled: isDisabled,
  }

  const buttonConfigs = {
    returnHomeButton: {
      icon: <HomeIcon sx={{ fontSize: 24 }} />,
      tooltip: 'Return to Home Page',
    },
    translationLanguage: {
      icon: isTranslationEnglish ? (
        <h1 className='text-xl'>EN</h1>
      ) : (
        <h1 className='text-xl font-extrabold'>中</h1>
      ),
      tooltip: isTranslationEnglish
        ? 'View Chinese Translations'
        : 'View English Translations',
    },
    translation: {
      icon: <TranslateIcon sx={{ fontSize: 24 }} />,
      tooltip: isTranslationVisible ? 'Hide Translations' : 'Show Translations',
    },
    lyrics: {
      icon: <LyricsIcon sx={{ fontSize: 24 }} />,
      tooltip: isLyricsVisible ? 'Hide Lyrics' : 'Show Lyrics',
    },
    romaji: {
      icon: <h1 className='text-xl'>R</h1>,
      tooltip: isRomajiVisible ? 'Hide Romaji' : 'Show Romaji',
    },
    lyricsPosition: {
      icon: isLyricsDisplayBottom ? (
        <VerticalAlignTopIcon />
      ) : (
        <VerticalAlignBottomIcon />
      ),
      tooltip: isLyricsDisplayBottom
        ? 'Align Lyrics Top'
        : 'Align Lyrics Bottom',
    },
    bookmarkButton: {
      icon: currentVideo ? (
        isFavorite(currentVideo.videoId) ? (
          <BookmarkAddedIcon />
        ) : (
          <BookmarkBorderIcon
            sx={{
              fontSize: 24,
              transform: 'scaleX(-1) rotate(0deg)',
              transformOrigin: 'center',
            }}
          />
        )
      ) : (
        <BookmarkBorderIcon
          sx={{
            fontSize: 24,
            transform: 'scaleX(-1) rotate(0deg)',
            transformOrigin: 'center',
          }}
        />
      ),
      tooltip: !currentVideo
        ? 'No video selected'
        : currentVideo && isFavorite(currentVideo.videoId)
          ? 'Remove from Bookmarks'
          : 'Add to Bookmarks',
    },
    shareButton: {
      icon: (
        <ReplyIcon
          sx={{
            fontSize: 24,
            transform: 'scaleX(-1) rotate(0deg)',
            transformOrigin: 'center',
          }}
        />
      ),
      tooltip: 'Copy URL',
    },
  }

  return {
    ...baseConfig,
    ...buttonConfigs[id],
  }
}

export const LyricsVisibilityControlButton: React.FC<ButtonProps> = ({
  id,
  value,
  onClick,
  isActive,
  isHovered,
  currentVideo,
  isFavorite,
  isLyricsDisplayBottom,
  isTranslationEnglish,
  isRomajiVisible,
  isLyricsVisible,
  isTranslationVisible,
}) => {
  const buttonProps = getButtonProps({
    id,
    isActive,
    isHovered,
    currentVideo,
    isFavorite,
    isLyricsDisplayBottom,
    isTranslationEnglish,
    isRomajiVisible,
    isLyricsVisible,
    isTranslationVisible,
  })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleGroupItem
          value={value}
          onClick={onClick}
          variant='default'
          aria-label={buttonProps.tooltip}
          disabled={buttonProps.disabled}
          className={buttonProps.className}
          style={buttonProps.style}>
          {buttonProps.icon}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent
        side='right'
        align='start'
        sideOffset={6}
        alignOffset={-4}
        className='unhighlightable border-none bg-primary'>
        {buttonProps.tooltip}
      </TooltipContent>
    </Tooltip>
  )
}
