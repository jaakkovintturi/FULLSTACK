import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text} </td>
    <td> {props.value}</td>
    <td> {props.prosentti}</td>
    </tr>
  )

}

const Statistics = (props) => {
  if(props.all == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
      <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.all} />
      <StatisticLine text="average" value ={props.avg / props.all} />
      <StatisticLine text="positive" value ={props.pos / props.all * 100} prosentti="%" /> 
      </tbody>
      </table> )
      
}
const App = props => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (

    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => 
        setGood(good+1)}
        text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1> statistics</h1>
      <Statistics 
      good={good} 
       bad={bad} 
       neutral={neutral}
       all = {good+bad+neutral}
       avg = {(good*1+bad*(-1))}
       pos = {good}/>
    </div>
    
  )
}
ReactDOM.render(<App />, 
  document.getElementById('root'))