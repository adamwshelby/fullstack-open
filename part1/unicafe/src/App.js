import React, { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div> No feedback given </div>
      )
  } else {
    const average = (good - bad) / (total)
    const positive = (good / (total)) * 100
    return (
      <div>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive.toString() + " %"}/>
      </div>
      )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClick={() => setGood(good + 1)}/>
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" onClick={() => setBad(bad + 1)}/>
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App