import LoginButtonTest from './components/shared/LoginButtonTest'
import SearchBarViewToggler from './components/shared/SearchBarViewToggler'
import TopBar from './components/shared/TopBar'
import './globals.css'

const App = () => {
  return (
    <>
      <TopBar />
      <div>
        <p>Test v5</p>
        <ruby className='font_noto_sans_jp_black_900'>
          漢<rp>(</rp>
          <rt>かん</rt>
          <rp>)</rp>字<rp>(</rp>
          <rt>じ</rt>
          <rp>)</rp>
        </ruby>
        <br />
        <ruby className='font_noto_sans_jp_reg'>
          漢<rp>(</rp>
          <rt>かん</rt>
          <rp>)</rp>字<rp>(</rp>
          <rt>じ</rt>
          <rp>)</rp>
        </ruby>
        <br />
        <p className='font_doki_doki'>カラオケ</p>
        <br />
        <ruby className='font_mochiy_pop_one'>
          漢<rp>(</rp>
          <rt>かん</rt>
          <rp>)</rp>字<rp>(</rp>
          <rt>じ</rt>
          <rp>)</rp>
        </ruby>

        <br />
        <p>Stop Breaking??</p>
        <br />
      </div>
      <LoginButtonTest />
    </>
  )
}
export default App
