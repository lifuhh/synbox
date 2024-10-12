/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import PersonIcon from '@mui/icons-material/Person'
import ReportIcon from '@mui/icons-material/Report'
import SettingsIcon from '@mui/icons-material/Settings'

import { handleRedirect } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { GitHubIcon } from '../svgicons'
import { Button } from '../ui/button'

const ProfileButtonDropdown = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleReportIssue = () => {
    //
  }

  const handleAboutOnClick = () => {
    navigate('/about')
  }

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
        {/* <DropdownMenuLabel className='unselectable'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className=' unselectable bg-dark-2' /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='cursor-pointer'
            // onClick={() => {
            //   toast({
            //     title: 'Scheduled: Catch up ',
            //     description: 'Friday, February 10, 2023 at 5:57 PM',
            //     action: (
            //       <ToastAction altText='Goto schedule to undo'>
            //         Undo
            //       </ToastAction>
            //     ),
            //   })
            // }}
            onClick={() => {
              toast({
                title: 'Coming Soon...',
                // description: 'This feature is coming soon',
                // action: (
                //   <ToastAction altText='Dismiss Toast'>Dismiss</ToastAction>
                // ),
              })
            }}>
            <AccountCircleIcon fontSize='small' className='mr-2 h-4 w-4' />
            <span>Profile</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem className='cursor-pointer'>
            <BookmarksIcon fontSize='small' className='mr-2 h-4 w-4' />
            <span>Playlist</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <CreditCardIcon className='mr-2 h-4 w-4' fontSize='small' />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <SettingsIcon className='mr-2 h-4 w-4' fontSize='small' />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='unselectable cursor-default bg-dark-2' />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => handleRedirect('https://github.com/lifuhuang97/')}>
            <GitHubIcon className='ml-[3px] mr-2 h-4 w-4 fill-white' />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={handleReportIssue}>
            <ReportIcon className='mr-2 h-4 w-4' fontSize='small' />
            <span>Report Issue</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={handleAboutOnClick}>
            <HelpOutlineIcon className='mr-2 h-4 w-4' fontSize='small' />
            <span>About Synbox</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* TODO: Future Accounts */}
        {/* <DropdownMenuSeparator className='unselectable cursor-default bg-dark-2' />

        // TODO: for login
        <LoginDropdownButton /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButtonDropdown
