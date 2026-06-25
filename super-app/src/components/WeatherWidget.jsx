import { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchWeatherByCoords } from "../services/apiServices";
import "./WeatherWidget.css";

const WEATHER_ICONS = {
  Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️",
  Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Haze: "🌫️",
  Fog: "🌫️", Smoke: "🌫️", Dust: "💨", Sand: "💨",
};

const DEFAULT_CITIES = ["London", "New York", "Tokyo", "Mumbai", "Sydney"];

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const data = await fetchWeatherByCoords(
              pos.coords.latitude,
              pos.coords.longitude
            );
            setWeather(data);
            setCity(data.name);
          } catch {
            loadDefaultCity();
          } finally {
            setLoading(false);
          }
        },
        () => loadDefaultCity()
      );
    } else {
      loadDefaultCity();
    }
  }, []);

  const loadDefaultCity = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentWeather("London");
      setWeather(data);
      setCity("London");
    } catch {
      setError("Unable to fetch weather. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!inputCity.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentWeather(inputCity.trim());
      setWeather(data);
      setCity(data.name);
      setInputCity("");
    } catch {
      setError(`City "${inputCity}" not found.`);
    } finally {
      setLoading(false);
    }
  };

  const mainCondition = weather?.weather?.[0]?.main || "";
  const weatherIcon = WEATHER_ICONS[mainCondition] || "🌡️";

  return (
    <div className="widget weather-widget">
      <div className="widget-header">
        <span className="widget-title">
          <span className="icon">🌤</span> Weather
        </span>
        {weather && (
          <span className="weather-city-badge">{weather.name}, {weather.sys?.country}</span>
        )}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span>Fetching weather...</span>
        </div>
      )}

      {error && (
        <div className="weather-error">
          <p>⚠ {error}</p>
          <button className="btn btn-ghost" onClick={loadDefaultCity} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>
            Try London
          </button>
        </div>
      )}

      {weather && !loading && (
        <>
          <div className="weather-main">
            <span className="weather-icon-large">{weatherIcon}</span>
            <div className="weather-temp-block">
              <span className="weather-temp">{Math.round(weather.main.temp)}°C</span>
              <span className="weather-condition">{weather.weather[0].description}</span>
            </div>
          </div>

          <div className="weather-feels-like">
            Feels like {Math.round(weather.main.feels_like)}°C
          </div>

          <div className="weather-stats">
            <div className="weather-stat">
              <span className="stat-icon">💧</span>
              <span className="stat-value">{weather.main.humidity}%</span>
              <span className="stat-label">Humidity</span>
            </div>
            <div className="weather-stat">
              <span className="stat-icon">🌬️</span>
              <span className="stat-value">{Math.round(weather.wind.speed)} m/s</span>
              <span className="stat-label">Wind</span>
            </div>
            <div className="weather-stat">
              <span className="stat-icon">🔵</span>
              <span className="stat-value">{weather.main.pressure} hPa</span>
              <span className="stat-label">Pressure</span>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleCitySearch} className="weather-search">
        <input
          className="form-input weather-input"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Search city..."
          aria-label="Search city"
        />
        <button type="submit" className="btn btn-primary weather-search-btn">
          Go
        </button>
      </form>
    </div>
  );
};

export default WeatherWidget;
