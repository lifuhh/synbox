// import { useAppContext } from '@/context/AppContext'
// import { useSignInGoogleAccount } from '@/lib/react-query/queriesAndMutations'
// import { LogIn, LogOut } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import { DropdownMenuItem, DropdownMenuShortcut } from '../ui/dropdown-menu'
// import { toast } from '../ui/use-toast'

// const LoginDropdownButton = () => {
//   const { mutateAsync: signInGoogleAccount } = useSignInGoogleAccount()
//   const {
//     checkAuthUser,
//     isLoading: isUserLoading,
//     isAuthenticated,
//     user,
//   } = useAppContext()

//   const navigate = useNavigate()

//   const handleLogin = async () => {
//     let session

//     if (!isAuthenticated) {
//       session = await signInGoogleAccount()
//     } else {
//       console.log('This is user')
//       console.log(user)
//     }

//     if (!session) {
//       return toast({
//         title: 'Error',
//         description: 'An error occurred while trying to login',
//         duration: 5000,
//       })
//     }

//     const isLoggedIn = await checkAuthUser()

//     if (isLoggedIn) {
//       navigate('/')
//     }
//   }

//   const handleLogout = async () => {}

//   return (
//     <>
//       <DropdownMenuItem className='cursor-pointer' onClick={handleLogin}>
//         <LogIn className='mr-2 h-4 w-4' />
//         <span>Login</span>
//         <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//       </DropdownMenuItem>
//       <DropdownMenuItem className='cursor-pointer'>
//         <LogOut className='mr-2 h-4 w-4' />
//         <span>Log out</span>
//         <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//       </DropdownMenuItem>
//     </>
//   )
// }
// export default LoginDropdownButton
