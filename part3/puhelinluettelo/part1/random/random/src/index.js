import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
</button> )

const Voting = (props) => (
  <button onClick={props.handleClick}>
    {props.text} </button>
)

const Show = (props) => (
  <div>
  <h1>Anecdote of the day</h1>
  {props.anekdootti}
  <p>has {props.aanet} votes</p>
  </div>
)
const Top = (props) => {
  if(copy[props.aanet]>copy[props.aanet1]) {
    return (
      <div>
      <h1>Anecdote with most votes</h1> 
      <p> {props.anec} has {props.aanet} votes</p>
      </div>
    )
    }
  else return (
    <div>
    <h1>Anecdote with most votes</h1>
    <p> {props.anec1} has {props.aanet1} votes</p>
    </div>
    )
   
}





const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [naytos, setNaytos] = useState(0)
  let top = 0
  let topAnecdote = 0
  return (
    <div>
    <Show anekdootti={props.anecdotes[selected]}
     aanet={copy[selected]}/>
    
    <Voting handleClick={() => {
      setNaytos(naytos+1)
      copy[selected] += 1
    }}
      text="vote"
    />
    
    <Button handleClick={() => {
      setSelected(Math.floor(Math.random() * 6)) 
      setNaytos(copy[selected])
    }
    }
      text="next antidote"
    />

    <Top anec = {top}
    aanet = {topAnecdote}
    anec1 = {selected}
    aanet1 = {copy[selected]}/>
        </div>
  )
  }
const points = [0, 0, 0, 0, 0, 0]
const copy = [...points]
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)