const HeroGenerateLyricsProcessing = ({ subStage }: { subStage: number }) => {
  return (
    <div className='items-top bg-grid-white/[0.90] relative flex w-full overflow-hidden rounded-md bg-dark-1/[0.15] pt-10 antialiased md:h-[25rem]  md:justify-center'>
      <div className='flex-between w-full flex-col'>
        <h1>HeroGenerateLyricsProcessing</h1>
        <h1>Substage: {subStage}</h1>
      </div>
    </div>
  )
}
export default HeroGenerateLyricsProcessing
