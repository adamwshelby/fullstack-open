import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName}))
    document.getElementById('name').value = ""
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input id="name" onChange={handleChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => <div key={p.name}>{p.name}</div>
      )}
    </div>
  )
}

export default App