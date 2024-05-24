import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import PersonIcon from '@mui/icons-material/Person'
import {
  CreditCard,
  LifeBuoy,
  LogIn,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
import { GitHubIcon } from '../svgicons'
import { Button } from '../ui/button'

const ProfileButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className={` border-primary hover:border-white`}>
          <PersonIcon className='fill-white' />
          <span className='sr-only'>Toggle Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={10}
        className='w-56 overflow-auto border-[1px] border-primary bg-dark-1 bg-opacity-95'>
        <DropdownMenuLabel className='unselectable'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className=' unselectable bg-dark-2' />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='unselectable cursor-default bg-dark-2' />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <GitHubIcon className='mr-2 h-4 w-4 fill-white' />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <LifeBuoy className='mr-2 h-4 w-4' />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='unselectable cursor-default bg-dark-2' />
        <DropdownMenuItem className='cursor-pointer'>
          <LogIn className='mr-2 h-4 w-4' />
          <span>Login</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className='cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
