import { formatLyricsLineSrt } from '@/utils'

const TestPage = () => {
  const lyricsTestA1 = '知りたいその秘密ミステリアス'
  const lyricsTestA2 = 'shiritai sono himitsu misuteriasu'

  const test = formatLyricsLineSrt(lyricsTestA1, lyricsTestA2)
  console.log('returned lyrics: ' + test)

  return (
    <div className='absolute top-1/6 left-0 w-full h-full pointer-events-none  overflow-hidden z-40'>
      <h1>haha</h1>
    </div>
  )
}
export default TestPage
