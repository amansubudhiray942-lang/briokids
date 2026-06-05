import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';

const API_KEY = 'b6fd43b2a98d2533a5e60b92cd32f48a'; // Free tier OpenWeatherMap key

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');
  const [units, setUnits] = useState('metric'); // metric for Celsius, imperial for Fahrenheit

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);
      setCity(cityName);

      // 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${API_KEY}`
      );
      setForecast(forecastResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [units]);

  const handleSearch = (cityName) => {
    if (cityName.trim()) {
      fetchWeather(cityName);
    }
  };

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🌤️ Weather Dashboard</h1>
        <button className="units-toggle" onClick={toggleUnits}>
          °{units === 'metric' ? 'C' : 'F'} | Switch to °{units === 'metric' ? 'F' : 'C'}
        </button>
      </header>

      <SearchBar onSearch={handleSearch} />

      {error && <div className="error-message">{error}</div>}
      {loading && <LoadingSpinner />}

      {weather && !loading && (
        <>
          <CurrentWeather data={weather} units={units} />
          {forecast && <Forecast data={forecast} units={units} />}
        </>
      )}
    </div>
  );
}

export default App;
