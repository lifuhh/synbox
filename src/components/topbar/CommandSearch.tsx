import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { Kbd } from '@mantine/core'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface CommandSearchProps {
  isVideoPlayer: boolean
}

const CommandSearch: React.FC<CommandSearchProps> = ({ isVideoPlayer }) => {
  const [open, setOpen] = useState(false)

  const handleCommandItemClick = () => {
    // console.log('waw clicked command')
  }

  const handleCommandItemNavigate = (videoId: string) => {
    // console.log('waw clicked command item: ' + videoId)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <div>
        <Button
          variant={isVideoPlayer ? 'default' : 'outline'}
          role='combobox'
          aria-expanded={open}
          className={` ${
            isVideoPlayer ? 'w-[40px]' : 'w-[170px] md:w-[250px]'
          } justify-between border-primary px-2 hover:border-white hover:bg-dark-3/80`}
          onClick={() => setOpen((open) => !open)}>
          <div>
            <SearchIcon className={``} />
            {isVideoPlayer ? '' : 'Search YouTube'}
          </div>

          <div
            dir='ltr'
            className={`pb-1 align-middle  ${
              isVideoPlayer ? 'hidden' : 'hidden md:block'
            }`}>
            <Kbd className='px-2'>⌘</Kbd> + <Kbd className='px-2 '>K</Kbd>
          </div>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search for songs from YouTube here' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem
              className='cursor-pointer hover:bg-white/20'
              onSelect={() => handleCommandItemNavigate('YOASOBI')}>
              YOASOBI
            </CommandItem>
            <CommandItem
              className='cursor-pointer hover:bg-white/20'
              onSelect={handleCommandItemClick}>
              Ado
            </CommandItem>
            <CommandItem
              className='cursor-pointer hover:bg-white/20'
              onSelect={handleCommandItemClick}>
              VAUNDY
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
            <CommandItem
              className='cursor-pointer hover:bg-white/20'
              onSelect={handleCommandItemClick}>
              Highlights
            </CommandItem>
            <CommandItem>Videos</CommandItem>
            <CommandItem>Command Line</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default CommandSearch
