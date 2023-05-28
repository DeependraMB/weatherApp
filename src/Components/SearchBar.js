import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function SearchBar() {
  const api_key = '7df55b4d4a1b6dbf6db53c088f492d52';
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  if (weather){

      console.log(weather);
  }
  

  const latitud=latitude.lat;
  const longitude = latitude.lon;

  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };
 

  useEffect(() => {
    if (city) {
      axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 0) {
            setLatitude(response.data[0]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [city]);

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitude}&appid=${api_key}`)
        .then((response) => {
          
            
                setWeather(response.data);
              
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [latitude, longitude]);
  

  

  return (
    <div className='searchBar-body'>
      <div className='searchBar'>
        <input
          type='text'
          value={city}
          placeholder='Type city.....'
          onChange={(e) => setCity(e.target.value)}
        />
        <button className='searchButton'>
          <FaSearch />
        </button>
        <p>Temperature: {weather ? convertKelvinToCelsius(weather.main.temp) : '0'}°C</p>
      </div>
    </div>
  );
}

export default SearchBar;
