import './Forecast.css';

function Forecast({ data, units }) {
  if (!data) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const dailyForecasts = {};

  // Group forecasts by day
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
  });

  // Get one forecast per day (noon)
  const forecastDays = Object.entries(dailyForecasts)
    .slice(0, 5)
    .map(([date, forecasts]) => {
      const noonForecast = forecasts.find((f) =>
        new Date(f.dt * 1000).getHours() === 12
      ) || forecasts[0];
      return { date, ...noonForecast };
    });

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('mist')) return '🌫️';
    return '🌤️';
  };

  const getDayName = (dateString) => {
    const [month, day, year] = dateString.split('/');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecastDays.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{getDayName(day.date)}</div>
            <div className="forecast-icon">{getWeatherIcon(day.weather[0].description)}</div>
            <div className="forecast-temp">
              <span className="max-temp">{Math.round(day.main.temp_max)}{tempUnit}</span>
              <span className="min-temp">{Math.round(day.main.temp_min)}{tempUnit}</span>
            </div>
            <div className="forecast-description">{day.weather[0].main}</div>
            <div className="forecast-humidity">💧 {day.main.humidity}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
