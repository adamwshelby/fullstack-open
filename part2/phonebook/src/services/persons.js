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

const exportObject = { getAll, add, update }
export default exportObject
