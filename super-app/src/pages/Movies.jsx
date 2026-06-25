import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { searchMovieByGenre } from "../services/apiServices";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import "./Movies.css";

const Movies = () => {
  const { categories } = useStore();
  const navigate = useNavigate();
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    categories.forEach((cat) => {
      fetchMoviesForCategory(cat);
    });
  }, [categories]);

  const fetchMoviesForCategory = async (category) => {
    setLoading((prev) => ({ ...prev, [category]: true }));
    setErrors((prev) => ({ ...prev, [category]: null }));
    try {
      const movies = await searchMovieByGenre(category);
      setMoviesByCategory((prev) => ({ ...prev, [category]: movies }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [category]: "Failed to load movies. Check your OMDB API key.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [category]: false }));
    }
  };

  return (
    <div className="movies-page">
      <header className="movies-nav">
        <button className="btn btn-ghost" onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
        <div className="movies-nav__title">
          <span>🎬</span>
          <span>Entertainment</span>
        </div>
        <div />
      </header>

      <div className="movies-hero animate-fade-in">
        <h1>Your Movie Picks</h1>
        <p>Curated based on your selected categories</p>
      </div>

      <div className="movies-content">
        {categories.map((category) => (
          <section key={category} className="movie-category-section animate-slide-up">
            <div className="category-section-header">
              <h2 className="category-section-title">
                <span className="category-label">
                  {getCategoryEmoji(category)} {capitalize(category)}
                </span>
              </h2>
              <button
                className="btn btn-ghost refresh-btn"
                onClick={() => fetchMoviesForCategory(category)}
                disabled={loading[category]}
              >
                {loading[category] ? "↻" : "⟳"} Refresh
              </button>
            </div>

            {loading[category] && (
              <div className="loading-container">
                <div className="loading-spinner" />
                <span>Fetching {category} movies...</span>
              </div>
            )}

            {errors[category] && (
              <div className="error-banner">
                ⚠ {errors[category]}
              </div>
            )}

            {!loading[category] && !errors[category] && (
              <div className="movies-row">
                {(moviesByCategory[category] || []).length === 0 ? (
                  <p className="no-results">No movies found for this category.</p>
                ) : (
                  (moviesByCategory[category] || []).slice(0, 8).map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => setSelectedMovie(movie)}
                    />
                  ))
                )}
              </div>
            )}
          </section>
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const getCategoryEmoji = (cat) => {
  const map = {
    action: "💥", comedy: "😂", drama: "🎭", music: "🎵",
    sports: "⚽", thriller: "🔍", fantasy: "🧙", romance: "💝",
  };
  return map[cat] || "🎬";
};

export default Movies;
