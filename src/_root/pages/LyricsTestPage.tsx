import LyricTextLine from '@/components/lyrics-display/LyricTextLine'

const LyricsTestPage = () => {
  const engLyricsTest = 'Now, in the quiet night'
  const chiLyricsTest = '现在，在宁静的夜晚里'
  const jpLyricsTest =
    '<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>、<ruby>静<rp>(</rp><rt>しず</rt><rp>)</rp></ruby>かな<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で'
  const romajiLyricsTest = 'Ima Shizukanayorunonakade'

  return (
    <section className='unselectable flex flex-1 flex-col items-center justify-end'>
      {/* //! Translation Toggle-able */}
      <LyricTextLine
        htmlContent={engLyricsTest}
        className='font_noto_sans_jp_reg font-outline-1 text-2.4vw'
      />

      {/* //! Japanese Lyrics */}
      <LyricTextLine
        htmlContent={jpLyricsTest}
        className='font_noto_sans_jp_reg font-outline-1 text-3.5vw'
      />

      {/* //! Romaji Label */}
      <LyricTextLine
        htmlContent={romajiLyricsTest}
        className='font_noto_sans_jp_black_900 font-outline-1 text-2vw'
      />
    </section>
  )
}
export default LyricsTestPage
