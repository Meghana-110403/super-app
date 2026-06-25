import axios from "axios";

// ===== API KEYS =====
export const API_KEYS = {
  weather: import.meta.env.VITE_WEATHER_API_KEY || "YOUR_OPENWEATHERMAP_KEY",
  news: import.meta.env.VITE_NEWS_API_KEY || "YOUR_GNEWS_KEY",
  movie: import.meta.env.VITE_MOVIE_API_KEY || "YOUR_OMDB_KEY",
};

// ===== HTTP CLIENTS =====
const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const newsClient = axios.create({
  baseURL: "https://gnews.io/api/v4",
});

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

// ===== WEATHER =====
export const fetchCurrentWeather = async (city = "London") => {
  try {
    const response = await weatherClient.get(
      `/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEYS.weather}`
    );
    return response.data;
  } catch (error) {
    console.error("Weather service failure:", error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await weatherClient.get(
      `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEYS.weather}`
    );
    return response.data;
  } catch (error) {
    console.error("Weather by coords failure:", error);
    throw error;
  }
};

// ===== NEWS (GNews API - supports CORS) =====
export const fetchTopHeadlines = async (category = "general") => {
  try {
    const response = await newsClient.get(
      `/top-headlines?lang=en&max=10&apikey=${API_KEYS.news}`
    );
    return response.data.articles || [];
  } catch (error) {
    console.error("News service failure:", error);
    throw error;
  }
};

// ===== MOVIES =====
export const searchMovieByGenre = async (query) => {
  try {
    const response = await movieClient.get(
      `/?s=${encodeURIComponent(query)}&type=movie&apikey=${API_KEYS.movie}`
    );
    return response.data.Search || [];
  } catch (error) {
    console.error("Movie query service failure:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await movieClient.get(
      `/?i=${imdbID}&plot=full&apikey=${API_KEYS.movie}`
    );
    return response.data;
  } catch (error) {
    console.error("Movie detail query error:", error);
    throw error;
  }
};