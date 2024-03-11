import { parseSrt } from '@/utils'
import { useCallback } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

const TestPage = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = (e) => {
        // Do whatever you want with the file contents
        const content = (e.target as FileReader).result
        const parsedContent = parseSrt(content)
        console.log(parsedContent)
      }
      reader.readAsText(file)
    }, [])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'text/srt': ['.srt'],
    },
  })

  return (
    <div className='absolute top-1/6 left-0 w-full h-full z-40'>
      <div
        {...getRootProps()}
        className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
        <input {...getInputProps()} />
        <div className='max-w-full h-40 bg-slate-600 mt-40 mx-20 flex-center'>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    </div>
  )
}
export default TestPage
