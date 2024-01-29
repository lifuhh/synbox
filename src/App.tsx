import LoginButtonTest from './components/shared/LoginButtonTest'
import SearchBarTest from './components/shared/SearchBarTest'
import './globals.css'

const App = () => {
  return (
    <>
      <div>
        <SearchBarTest />
      </div>
      <div>
        <p>Test v5</p>
        <ruby>
          漢<rt>かんかん</rt>字<rt>じ</rt>
        </ruby>
        <p>Stop Breaking??</p>
      </div>
      <LoginButtonTest />
    </>
  )
}
export default App
