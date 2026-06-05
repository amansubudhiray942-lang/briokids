# 🌤️ Weather Dashboard

A beautiful, responsive weather dashboard built with React that fetches real-time weather data from the OpenWeatherMap API.

## ✨ Features

- 🌍 **Real-time Weather Data** - Get current weather for any city worldwide
- 📊 **5-Day Forecast** - See weather predictions for the next 5 days
- 🌡️ **Temperature Units** - Toggle between Celsius and Fahrenheit
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 🔍 **City Search** - Search weather for any city in the world
- 📈 **Detailed Metrics** - Humidity, wind speed, pressure, visibility, cloudiness, sunrise time

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ ([Download here](https://nodejs.org))
- npm (comes with Node.js)

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3001`

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx      # Current weather display
│   │   ├── CurrentWeather.css
│   │   ├── Forecast.jsx             # 5-day forecast
│   │   ├── Forecast.css
│   │   ├── SearchBar.jsx            # City search
│   │   ├── SearchBar.css
│   │   ├── LoadingSpinner.jsx       # Loading state
│   │   └── LoadingSpinner.css
│   ├── App.jsx                      # Main component
│   ├── App.css
│   └── main.jsx                     # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🌐 API Used

- **OpenWeatherMap API** (Free tier)
  - Current weather endpoint
  - 5-day forecast endpoint
  - No authentication required (free public key included)

## 🎯 Key Information

**Current Weather Data:**
- Temperature (with feels-like)
- Weather condition
- Wind speed
- Humidity
- Atmospheric pressure
- Visibility
- Cloud coverage
- Sunrise/Sunset time

**5-Day Forecast:**
- Daily weather conditions
- Max/Min temperatures
- Weather icons
- Humidity levels

## 🎨 Technology Stack

- **React 18** - UI Framework
- **Vite** - Build tool
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with animations

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 📤 Deploy Online

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Deploy automatically

## 💡 Features You Can Add

- [ ] Geolocation support (detect user's location)
- [ ] Weather alerts and warnings
- [ ] Air quality index
- [ ] UV index
- [ ] Hourly forecast
- [ ] Multiple city comparison
- [ ] Weather history
- [ ] Dark mode toggle
- [ ] Local storage for favorite cities

## 📝 Notes

- The API key is public and limited to free tier requests
- For production, consider using your own API key
- Current weather is updated in real-time
- Forecast updates every few hours

## ❓ Support

For issues or feature requests, please open an issue on GitHub.

---

**Made with ❤️ for weather enthusiasts**
