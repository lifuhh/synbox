import { Button } from '../ui/button'

const RequestDialogValidationDisplay = ({ vidInfo }) => {
  return (
    <div className='mt-4 max-h-screen overflow-y-scroll'>
      <h3 className='text-xl font-bold'>Video Information</h3>
      <pre className='mt-2 whitespace-pre-wrap'>
        {JSON.stringify(vidInfo, null, 2)}
      </pre>
      <Button
        onClick={() => {}}
        className='mt-4 bg-blue-500 text-white hover:bg-blue-600'>
        Proceed to Next Step
      </Button>
    </div>
  )
}
export default RequestDialogValidationDisplay
