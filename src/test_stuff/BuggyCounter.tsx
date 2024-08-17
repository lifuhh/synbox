import React, { useState } from 'react'

const BuggyCounter: React.FC = () => {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    if (counter === 5) {
      throw new Error('I crashed!')
    }
    setCounter(counter + 1)
  }

  return <button onClick={handleClick}>{counter}</button>
}

export default BuggyCounter
