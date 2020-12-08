
import './App.css';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Add = (props) => {
  return (
  <div>
    <p>name:</p> <input 
      value={props.newName}
      onChange={props.handleNameChange}/>
    <p>number:</p> <input 
      value={props.newNumber}
      onChange={props.handleNumberChange}/>
      <button onClick={props.addInformation} type="submit">add</button>
  </div>
  )
}
const Notification = ( { message } ) => {
	if ( message === null ) {
		return null;
	}
	else return (
		<div className="notification">
			{ message }
		</div>
	);
}
const Person = ( {person, msg, persons} ) => {

  const confirmation = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      if(persons.includes(person)) {
      axios 
      .delete(`http://localhost:3003/api/persons/${person.id}`)
      console.log('Person deleted.')
    } 
      msg(`${person.name} deleted.`)
      setTimeout(() => {
        msg(null)
      }, 2500)
    }
  
}

  return (
      <tr>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td><button onClick={confirmation} type="submit">delete</button></td>
          
      </tr>
          
  )
}


const Persons = ({setPersons, persons, setNewMessage}) => {

  useEffect(() => {

    const getPersons = () => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    }
    getPersons();
  }, [])

  console.log('render', persons.length, 'notes')
  return (
      <table>
          <tbody>
              {persons.map(person => <Person key={person.name} person={person} msg={setNewMessage} persons={persons}/>)}
          </tbody>
      </table>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newMessage, setNewMessage ] = useState(null)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  

const addInformation = (event) => {
  event.preventDefault()
  const nameObject = {
    name: newName,
    number: newNumber
  }


  const existingPerson = persons.find(p => p.name === newName)
   
  const changeNumber = id => {
    const id1 = (persons.find(n=>n.id===id))
    
    const changedNumber = {...id1, number: newNumber}
  
    personService
    .update(Number(id1.id), changedNumber)
    .then(response => response.data)
    .then(response => {
      setPersons(persons.map(note => Number(note.id) !== Number(id) ? note : response.data))
    })
    .catch(error => {
      setNewMessage(`Information of '${changedNumber.name}' has already been removed from server`)
      setTimeout(() => {
        setNewMessage(null)
      }, 4000)
      setPersons(persons.filter(n => Number(n.id) !== Number(id)))

    })
   
  }

  if(existingPerson!==undefined && newNumber!=="") {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
    changeNumber(existingPerson.id)

    }
  } else if(newName!=="" && newNumber!=="") {
  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')

  setNewMessage(`Lisättiin ${newName}`)
  setTimeout(() => {
    setNewMessage(null)
  }, 2500)
  
  personService
  .create(nameObject)
  .then(response => {
    console.log(response)
  })
}

}

const gone = () => {
  if (window.confirm(`Delete all the names?`)) { 
    for (let i = 0; i < persons.length; i++) {
    let delete1 = persons[i]
    axios 
    .delete(`http://localhost:3003/api/persons/${delete1.id}`)
    
}console.log('Persons deleted.')
}


}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {newMessage}/>
      <form>
       <Add handleNumberChange={handleNumberChange} newNumber={newNumber}  
       handleNameChange={handleNameChange}
       newName={newName} addInformation = {addInformation}/>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} setNewMessage={setNewMessage}/>
      <button onClick={gone} type="submit">delete all</button>
    </div>
  )

}

export default App;
