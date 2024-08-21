// import RequestDialog from '@/components/shared/RequestDialog'
// import { Button } from '@/components/ui/button'
// import { Dialog, DialogTrigger } from '@/components/ui/dialog'
// import BuggyCounter from '@/test_stuff/BuggyCounter'
// import { Divider } from '@mantine/core'
// import { useDisclosure } from '@mantine/hooks'
// import { useState } from 'react'
// import { Helmet } from 'react-helmet-async'

// const TestRequestPage = () => {
//   const [dialogOpen, setDialogOpen] = useState(false)
//   const [loaderVisible, loaderVisibilityHandler] = useDisclosure(false)

//   const handleOpenOverlay = () => {
//     setDialogOpen(true)
//     loaderVisibilityHandler.open()
//   }

//   const handleStepOne = () => {
//     //
//   }

//   const handleStepTwo = () => {
//     //
//   }

//   const handleStepThree = () => {
//     //
//   }

//   return (
//     <div className='mt-14 flex w-full flex-col'>
//       <Helmet>
//         <title>Request Test Page | Synbox</title>
//       </Helmet>
//       <div className='flex-between min-w-screen mx-auto mt-20 '>
//         <Dialog open={dialogOpen}>
//           <DialogTrigger asChild>
//             <div className='flex flex-col'>
//               <Button variant={'default'} onClick={handleOpenOverlay}>
//                 Toggle Overlay
//               </Button>
//               <Divider my='xl' />
//               <div className='flex flex-col gap-4'>
//                 <Button variant={'default'}>One</Button>
//                 <Button variant={'secondary'}>Two</Button>
//                 <Button variant={'destructive'}>Three</Button>
//                 <Button variant={'outline'}>Four</Button>
//                 <Button variant={'ghost'}>Ghost</Button>
//                 <Button variant={'link'}>Link</Button>
//                 <BuggyCounter />
//               </div>
//             </div>
//           </DialogTrigger>
//           <RequestDialog
//             setDialogOpen={setDialogOpen}
//             loaderVisible={loaderVisible}
//             loaderVisibilityHandler={loaderVisibilityHandler}
//           />
//         </Dialog>
//       </div>
//     </div>
//   )
// }
// export default TestRequestPage
