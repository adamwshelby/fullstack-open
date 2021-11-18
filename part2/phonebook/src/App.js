import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number: '1234567890'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsEqual = (p1, p2) => {
    return (p1.name === p2.name)
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
    } else {
      window.alert(`${newName} is already a person in the phonebook`)
    }
    document.getElementById('name').value = ""
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((p) => <div key={p.name}>{p.name} {p.number}</div>
      )}
    </div>
  )
}

export default App