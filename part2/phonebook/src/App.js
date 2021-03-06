import React, { useState, useEffect } from 'react'
import personService from "./services/persons"

const Button = ({ onClick, label }) => {
  return (
    <button onClick={() => onClick()}>{label}</button>
  )
}

const Person = (props) => {
  return (
    <div key={props.p.name}>{props.p.name} {props.p.number} <Button onClick={() => props.removePerson(props.p)} label="remove"/></div>
  )
}

const Entries = ({ removePerson, filter, persons }) => {

  const isPrefix = (p, s) => {
    if (p.length <= s.length) {
      return (s.substring(0, p.length).toUpperCase() === p.toUpperCase())
    } else {
      return false
    }
  }

  if (filter.length === 0) {
    return (
      <div>{persons.map((p) => <Person key={p.name} p={p} removePerson={removePerson}/>)}</div>
    )} else {
    return(
      <div>{persons.map((p) => isPrefix(filter, p.name) ? <Person key={p.name} p={p} removePerson={removePerson}/> : <div key={p.name}></div>)}</div>
      )
  }
}

const Filter = ({ handleFilterChange }) => <div>filter shown with <input onChange={handleFilterChange}/></div>

const Add = ({ addPerson, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input id="name" onChange={handleNameChange}/>
        </div>
        <div>
          number: <input id="number" onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  )
}

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={isError ? 'error' : 'success'}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage] = useState(null)
  const [ isError, setIsError] = useState(false)

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    personService.getAll()
      .then(allPersons => {
      setPersons(allPersons)
      }
    )
  }

  const removePerson = (person) => {
    personService.removePerson(person.id).then(() => {
      setIsError(false)
      setMessage(`Removed ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
      refresh()
    }).catch(() => {
      setIsError(true)
      setMessage(`The person '${person.name}' was already deleted from server.`)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
      refresh()
      })
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsEqual = (p1, p2) => {
    return (p1.name.toUpperCase() === p2.name.toUpperCase())
  }

  const updatePerson = (newPersonObject, oldPersonObject) => {
    personService.update(oldPersonObject.id, newPersonObject).then(
      () => {
        refresh()
        document.getElementById('number').value = ""
        setNewNumber('')
      }
    ).catch(() => {
      setIsError(true)
      setMessage(`The person '${newPersonObject.name}' does not exist and cannot be updated.`)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
      refresh()
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName}
    let isNew = true
    let matchedPerson = null
    for (let x = 0; x < persons.length; x++) {
      if (personsEqual(persons[x], newPerson)) {
        isNew = false
        matchedPerson = persons[x]
      }
    }

    const newPersonObject = {name: newName, number: newNumber}
    if (isNew) {
      personService.add(newPersonObject).then(() => refresh())
      document.getElementById('number').value = ""
      setNewNumber('')
      setIsError(false)
      setMessage(`Added ${newPersonObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
    } else {
      updatePerson(newPersonObject, matchedPerson)
      setIsError(false)
      setMessage(`Updated ${newPersonObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
    }
    document.getElementById('name').value = ""
    setNewName('')
    document.getElementById('number').value = ""
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} />
      <h2>Filter People</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add People</h2>
      <Add 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h2>Entries</h2>
      <Entries removePerson={removePerson} filter={filter} persons={persons}/>
    </div>
  )
}

export default App