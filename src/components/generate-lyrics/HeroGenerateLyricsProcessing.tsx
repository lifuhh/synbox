const HeroGenerateLyricsProcessing = ({ subStage }: { subStage: number }) => {
  return (
    <div className='md:h-[25rem] w-full rounded-md flex items-top md:justify-center pt-10 bg-dark-1/[0.15] antialiased bg-grid-white/[0.90] relative  overflow-hidden'>
      <div className='w-full flex-between flex-col'>
        <h1>HeroGenerateLyricsProcessing</h1>
        <h1>Substage: {subStage}</h1>
      </div>
    </div>
  )
}
export default HeroGenerateLyricsProcessing
