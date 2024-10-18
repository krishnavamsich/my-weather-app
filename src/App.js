import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { LightModeRounded, Timer } from '@mui/icons-material';
import { Input, Button, CircularProgress } from '@mui/material';

function App() {
  const [cityName, setCityName] = useState('Hyderabad');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const apiKey = "e8ce578060e5f227dd77dadc63b4df42";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  const kelvinToCelsius = (kelvin) => kelvin - 273.15;

  const getWeatherData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const jsonData = await res.json(); // Parse the JSON response
      setData(jsonData); // Set the actual weather data
    } catch (e) {
      console.log('error -->', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <div className="App-header">
        <LightModeRounded className="App-logo" style={{ fontSize: 150, color: 'yellow' }} fontSize="large" />
        <div className="App-heading">My Weather App</div>
        <div className="App-description">Search your city and know the weather</div>

        <Input
          value={cityName}
          onChange={(e) => { 
            console.log(e.target.value); 
            return setCityName(e.target.value); 
          }}
          disableUnderline
          placeholder="Search city using name"
          sx={{
            border: '1px solid #ccc',
            padding: '5px',
            color: 'white',
            '&::placeholder': {
              color: 'grey',
            },
            backgroundColor: '#333',
            borderRadius: '12px',
            marginBottom: '10px',
          }}
        />

        {loading && <CircularProgress style={{ fontSize: 40, color: 'yellow' }} fontSize="large" />}
        {!loading && (
          <Button
            disabled={loading}
            onClick={() => { getWeatherData(); }}
            style={{ color: 'black', borderRadius: '12px', backgroundColor: 'yellow' }}
            variant="contained"
          >
            Search
          </Button>
        )}

        {data && data.main && (
          <>
          <div className="data">
            Temperature: {kelvinToCelsius(data.main.temp).toFixed(2)} °C
          </div>
           <div className="data">
           Pressure: {data.main.pressure} Pa
         </div>
          <div className="data">
          Humidity: {data.main.humidity} %
        </div></>
        )}
      </div>
    </div>
  );
}

export default App;
