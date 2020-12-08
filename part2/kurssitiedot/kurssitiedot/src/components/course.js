import React from 'react'



const Course = (props) => {
  const reducer = (init, curr) => init + curr;
  return (
  <div>
    <header><h3>Web development curriculum</h3></header>
    <content>
    {props.course.map(kurssit=><p key = {kurssit.id}><b>{kurssit.name}</b>{kurssit.parts.map(osat=><p key={osat.id}>{osat.name} {osat.exercises}</p>)}total of {kurssit.parts.map(part => part.exercises).reduce(reducer)} courses</p>)}
    </content>
  </div>)
}
  export default Course;