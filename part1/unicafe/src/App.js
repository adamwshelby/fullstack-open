import React, { useState } from 'react'

const Display = ({label, count}) => <div>{label} {count}</div>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

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
      </div>
    </div>
  )
}

export default App