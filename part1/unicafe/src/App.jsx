import { useState } from 'react'
// import Statistics from './Statistics'
import { Statistics } from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [average, setAverage] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)
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

      console.log("calculating average...", good, neutral, bad)
      const newTotalVotes = good + neutral + bad
      setTotalVotes(newTotalVotes)
      const newAverage = (good - bad) / totalVotes
      if (newAverage === Infinity) {
        setAverage(1)
      } else if (newAverage === -Infinity) {
        setAverage(-1)
      } else {
        setAverage(newAverage)
      }

      const positives = (good * 100) / newTotalVotes
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
      <Statistics totalVotes={totalVotes} average={average} totalPositives={totalPositives} good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
