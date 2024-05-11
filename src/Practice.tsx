const Practice = () => {
  const testFn = () => {
    console.log('test')
  }

  const TestJSX = () => {
    return (
      <div>
        <div>Test</div>
      </div>
    )
  }

  return (
    <div>
      <TestJSX />
      <TestJSX />
    </div>
  )
}

export default Practice
