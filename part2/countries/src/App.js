import React, { useState, useEffect } from 'react'
import axios from "axios"

const Query = ( {onChange} ) => {
  return (
    <div>
      <p>find countries <input type="text" onChange={(e) => onChange(e.target.value)}/></p>
    </div>
  )
}

const Results = ( {countries} ) => {
  if (countries.length > 10) {
    return (
      <div>
        Please be more specific.
      </div>) 
  } else if (countries.length === 0) {
    return (
      <div>
        No countries found.
      </div>)
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <h3>{country.name.official}</h3>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>Languages</h3>
        {Object.keys(country.languages).map((k) => <div key={k}>{country.languages[k]}</div>)}
        <img src={country.flags.png} height="100"/>
      </div>)
  } else {
    return (
      <div>
        {countries.map((country) => <div key={country.name.official}>{country.name.common}, officially known as {country.name.official}</div>)}
      </div>)
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => {
          setCountries(response.data)
        })
        .catch(err => {setCountries([])})
    }
  }, [query])


  return (
    <div>
      <Query onChange={setQuery}/>
      <Results countries={countries}/>
    </div>
  );
}

export default App;
