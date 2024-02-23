import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import CaptionFileDrop from './CaptionFileDrop'

const LyricsUploadDialog = () => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Lyrics</DialogTitle>
          <DialogDescription>
            Upload and customize lyrics file for this song
          </DialogDescription>
        </DialogHeader>
        <CaptionFileDrop />
        {/* <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              defaultValue='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Input
              id='username'
              defaultValue='@peduarte'
              className='col-span-3'
            />
          </div>
        </div> */}
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
export default LyricsUploadDialog
