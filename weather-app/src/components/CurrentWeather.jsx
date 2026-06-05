import './CurrentWeather.css';

function CurrentWeather({ data, units }) {
  if (!data) return null;

  const { main, weather, wind, clouds, sys } = data;
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder') || desc.includes('storm')) return '⛈️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  return (
    <div className="current-weather-card">
      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(weather[0].description)}
        </div>
        <div className="temp-section">
          <div className="temperature">{Math.round(main.temp)}{tempUnit}</div>
          <div className="feels-like">Feels like {Math.round(main.feels_like)}{tempUnit}</div>
        </div>
      </div>

      <div className="location-info">
        <h2>{data.name}, {sys.country}</h2>
        <p className="description">{weather[0].main} - {weather[0].description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{wind.speed} {speedUnit}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">👁️</span>
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">☁️</span>
          <span className="detail-label">Cloudiness</span>
          <span className="detail-value">{clouds.all}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🌅</span>
          <span className="detail-label">Sunrise</span>
          <span className="detail-value">{new Date(sys.sunrise * 1000).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
