
const RequestDialogValidationDisplay = ({ vidInfo }) => {
  return (
    <div className='mt-4 max-h-screen overflow-y-scroll'>
      <h3 className='text-xl font-bold'>Video Information</h3>
      <pre className='mt-2 whitespace-pre-wrap'>
        {JSON.stringify(vidInfo['full_vid_info']['title'], null, 2)}
        <br />
        {JSON.stringify(vidInfo['passed'], null, 2)}
        <br />
        {JSON.stringify(vidInfo['subtitle_info']['exist'], null, 2)}
      </pre>
    </div>
  )
}
export default RequestDialogValidationDisplay
