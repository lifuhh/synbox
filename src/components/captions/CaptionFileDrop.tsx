import { convertFileToUrl } from '@/utils'
import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type CaptionFileDropProps = {
  mediaUrl: string
}

const CaptionFileDrop = ({ mediaUrl }: CaptionFileDropProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl)

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      setFileUrl(convertFileToUrl(acceptedFiles[0]))
    },
    [file]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'text/srt': ['.srt'],
    },
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className='file_uploader-box'>
          <img
            src='/assets/icons/file-upload.svg'
            width={120}
            height={77}
            alt='file-upload'
          />
          <h3 className='base-medium text-light-2 mb-2 mt-6'>
            Drag lyrics file here
          </h3>
          <p className='text-light-4 small-regular mb-6'>SRT</p>
          <Button className='shad-button_dark_4'>Select from computer</Button>
        </div>
      )}
    </div>
  )
}
export default CaptionFileDrop
