
import './App.css';

import React, { useState, useEffect } from 'react'
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
      personService 
      .deleteNumber(person.id)
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

  const names = persons.map(person => person.name);
  const existingPerson = persons.find(p => p.name === nameObject.name)
   

  const changeNumber = () => {
    personService
    .update(existingPerson.id, nameObject)
    .then(response => response.data)
    .then(response => {
      setPersons(persons.map(note => note.name !== nameObject.name ? note : response))
    })
    .catch(error => {
      setNewMessage(`Information of '${nameObject.name}' has already been removed from server`)
      setTimeout(() => {
        setNewMessage(null)
      }, 4000)
      setPersons(persons.filter(n => (n.id) !== existingPerson.id))

    })
   
  }

  if(!(names.includes(newName)) && newNumber!=="") {


  setNewMessage(`Lisättiin ${newName}`)
  console.log(nameObject.id)
  setTimeout(() => {
    setNewMessage(null)
  }, 2500)
  personService
  .create(nameObject)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    setNewMessage(error.response.data.error)
    console.log(error.response.data)
  })
  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
}
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
    changeNumber()
    }
}

const gone = () => {
  if (window.confirm(`Delete all the names?`)) { 
    for (let i = 0; i < persons.length; i++) {
    let delete1 = persons[i]
    personService 
    .deleteNumber(delete1.id)
    
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
