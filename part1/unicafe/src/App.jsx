import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [average, setAverage] = useState(0)
  const [totalPositives, setTotalPositives] = useState(0)

  const handleGood = () => {
      const updated = good + 1
      setGood(updated)
      console.log(`good: ${updated}`)
      handleAverage(updated, neutral, bad)
  }
  const handleNeutral = () => {
      const updated = neutral + 1
      setNeutral(updated)
      console.log(`neutral: ${updated}`)
      handleAverage(good, updated, bad)
  }
  const handleBad = () => {
      const updated = bad + 1
      setBad(updated)
      console.log(`bad: ${updated}`)
      handleAverage(good, neutral, updated)
  }

  const handleAverage = (good, neutral, bad) => {

      console.log("calculating average...")
      const totalVotes = good + neutral + bad
      const newAverage = (good - bad) / totalVotes
      setAverage(newAverage)

      const positives = (good * 100) / totalVotes
      setTotalPositives(positives)
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
      <p>Average {average.toFixed(2)}</p>
      <p>Positive votes {totalPositives.toFixed(2)}%</p>
      </div>
    </div>
  )
}

export default App
