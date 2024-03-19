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

const CommandSearch = () => {
  const [open, setOpen] = useState(false)

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
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[250px] justify-between px-2 border-primary hover:border-white hover:bg-dark-3/80'
          onClick={() => setOpen((open) => !open)}>
          <div className=''>
            <SearchIcon />
            Search YouTube
          </div>

          <div dir='ltr' className='align-middle pb-1'>
            <Kbd className='px-2'>⌘</Kbd> + <Kbd className='px-2 '>K</Kbd>
          </div>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search for songs from YouTube here' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem>YOASOBI</CommandItem>
            <CommandItem>Ado</CommandItem>
            <CommandItem>VAUNDY</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default CommandSearch
