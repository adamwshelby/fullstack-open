import React, { useState } from 'react'

const Entries = ({ filter, persons }) => {

  const isPrefix = (p, s) => {
    if (p.length <= s.length) {
      return (s.substring(0, p.length).toUpperCase() === p.toUpperCase())
    } else {
      return false
    }
  }

  if (filter.length === 0) {
    return (
      <div>{persons.map((p) => <div key={p.name}>{p.name} {p.number}</div>)}</div>
    )} else {
    return(
      <div>{persons.map((p) => isPrefix(filter, p.name) ? <div key={p.name}>{p.name} {p.number}</div> : <div key={p.name}></div>)}</div>
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

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number: '1234567890'},
    { name: 'Arden Thomas', number: '09444'},
    { name: 'Artie Gall', number: '914-907-1569'},
    { name: 'Beatrice Bell', number: '628-13444-03'},
    { name: 'Beatrice Bellie', number: '628-13444-032'},
    { name: 'Beatrice Belloo', number: '628-13444-033'},
    { name: 'Beatrice Bello3', number: '628-13444-034'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName}
    let isNew = true
    for (let x = 0; x < persons.length; x++) {
      if (personsEqual(persons[x], newPerson)) {
        isNew = false
      }
    }

    if (isNew) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      document.getElementById('number').value = ""
      setNewNumber('')
    } else {
      window.alert(`${newName} is already a person in the phonebook`)
    }
    document.getElementById('name').value = ""
    setNewName('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter People</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add People</h2>
      <Add 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h2>Entries</h2>
      <Entries filter={filter} persons={persons}/>
    </div>
  )
}

export default App