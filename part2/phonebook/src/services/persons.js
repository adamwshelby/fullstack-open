import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return (
    axios
      .get(baseUrl)
      .then(response => response.data)
  )
}

const add = newPerson => {
  const promise = axios.post(baseUrl, newPerson)
  return promise.then(response => response.data)
}

const update = (name, newPerson) => {
  const promise = axios.put(`${baseUrl}/${name}`, newPerson)
  return promise.then(response => response.data)
}

const removePerson = (id) => {
  const promise = axios.delete(`${baseUrl}/${id}`)
  return promise.then(response => response.data)
}

const exportObject = { getAll, add, update, removePerson }
export default exportObject
