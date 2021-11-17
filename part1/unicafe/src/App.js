import React, { useState } from 'react'

const Display = ({label, count}) => <div>{label} {count}</div>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const Average = ({good, neutral, bad}) => <div>average {(good - bad) / (good + neutral + bad)}</div>
const Positive = ({good, neutral, bad}) => <div>positive {(good / (good + neutral + bad)) * 100} %</div>

const DisplayIfNonzero = ({good, neutral, bad, output}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return <div>Review by clicking the buttons above.</div>
  } else {
    return output
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
        <Display label="good" count={good}/>
        <Display label="neutral" count={neutral}/>
        <Display label="bad" count={bad}/>
        <Display label="all" count={good + neutral + bad}/>
        <DisplayIfNonzero good={good} neutral={neutral} bad={bad} 
          output=<Average good={good} neutral={neutral} bad={bad}/>/>
        <DisplayIfNonzero good={good} neutral={neutral} bad={bad}
          output=<Positive good={good} neutral={neutral} bad={bad}/>/>
      </div>
    </div>
  )
}

export default App