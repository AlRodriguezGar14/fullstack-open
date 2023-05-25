import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
      const goodUpdated = good + 1
      setGood(goodUpdated)
      console.log(`good: ${goodUpdated}`)
  }
  const handleNeutral = () => {
      const updated = neutral + 1
      setNeutral(updated)
      console.log(`neutral: ${updated}`)
  }
  const handleBad = () => {
      const updated = bad + 1
      setBad(updated)
      console.log(`bad: ${updated}`)
  }
  return (
    <div>
      <div className='feedbackButtons'>
        <h2>give feedback</h2>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <div className='statistics'>
        <h2>statistics</h2>
        <ul>
          <li>good {good}</li>
          <li>neutral {neutral}</li>
          <li>bad {bad}</li>
      </ul>
      </div>
    </div>
  )
}

export default App
