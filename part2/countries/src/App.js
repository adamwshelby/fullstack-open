import React, { useState, useEffect } from 'react'
import axios from "axios"

const Query = ( {onChange} ) => {
  return (
    <div>
      <p>find countries <input type="text" onChange={(e) => onChange(e.target.value)}/></p>
    </div>
  )
}

const Button = ( {text, onClick} ) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const CountryDetail = ( {country} ) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Languages</h3>
      {Object.keys(country.languages).map((k) => <div key={k}>{country.languages[k]}</div>)}
      <img src={country.flags.png} alt={country.name.common + " flag"} height="100"/>
    </div>
  )
}

const Country = ( {country} ) => {
  const [showing, setShowing] = useState(false)
  if (showing) {
    return (
      <div>
        <Button text={"hide " + country.name.common} onClick={() => setShowing(!showing)}/>
        <CountryDetail country={country}/>
      </div>
    )
  } else {
    return (
      <div>
        {country.name.common} <Button text="show" onClick={() => setShowing(!showing)}/>
      </div>
    )
  }
  
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
    return (<CountryDetail country={country}/>)
  } else {
    return (
      <div>
        {countries.map((country) => <Country key={country.name.common} country={country}/>)}
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
