import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../services/apiServices";
import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetails();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [movie.imdbID]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovieDetails(movie.imdbID);
      setDetails(data);
    } catch {
      setError("Could not load movie details.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const poster =
    details?.Poster && details.Poster !== "N/A"
      ? details.Poster
      : "https://via.placeholder.com/300x450/1a1e2a/6c63ff?text=No+Poster";

  const ratingValue = details?.imdbRating && details.imdbRating !== "N/A"
    ? parseFloat(details.imdbRating)
    : null;

  return (
    <div className="modal-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="modal-content movie-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        {loading && (
          <div className="loading-container" style={{ minHeight: 300 }}>
            <div className="loading-spinner" />
            <span>Loading details...</span>
          </div>
        )}

        {error && (
          <div className="modal-error">
            <p>⚠ {error}</p>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        )}

        {details && !loading && (
          <div className="movie-modal-body">
            {/* Left: Poster */}
            <div className="movie-modal__poster-col">
              <img src={poster} alt={details.Title} className="movie-modal__poster" />
              {ratingValue && (
                <div className="movie-rating">
                  <span className="rating-star">★</span>
                  <span className="rating-value">{details.imdbRating}</span>
                  <span className="rating-label">/ 10 IMDb</span>
                </div>
              )}
              {details.Ratings?.map((r) => (
                r.Source !== "Internet Movie Database" && (
                  <div key={r.Source} className="movie-extra-rating">
                    <span className="rating-source">{r.Source}</span>
                    <span className="rating-val">{r.Value}</span>
                  </div>
                )
              ))}
            </div>

            {/* Right: Info */}
            <div className="movie-modal__info-col">
              <div className="movie-modal__header">
                <h2 className="movie-modal__title">{details.Title}</h2>
                <div className="movie-modal__meta">
                  <span className="badge badge-accent">{details.Year}</span>
                  {details.Rated && details.Rated !== "N/A" && (
                    <span className="badge badge-teal">{details.Rated}</span>
                  )}
                  {details.Runtime && details.Runtime !== "N/A" && (
                    <span className="movie-runtime">🕐 {details.Runtime}</span>
                  )}
                </div>
              </div>

              {details.Genre && details.Genre !== "N/A" && (
                <div className="movie-info-section">
                  <h4 className="info-label">Genre</h4>
                  <div className="genre-tags">
                    {details.Genre.split(", ").map((g) => (
                      <span key={g} className="genre-tag">{g}</span>
                    ))}
                  </div>
                </div>
              )}

              {details.Plot && details.Plot !== "N/A" && (
                <div className="movie-info-section">
                  <h4 className="info-label">Plot</h4>
                  <p className="movie-plot">{details.Plot}</p>
                </div>
              )}

              <div className="movie-crew">
                {details.Director && details.Director !== "N/A" && (
                  <div className="crew-item">
                    <span className="crew-role">Director</span>
                    <span className="crew-name">{details.Director}</span>
                  </div>
                )}
                {details.Actors && details.Actors !== "N/A" && (
                  <div className="crew-item">
                    <span className="crew-role">Cast</span>
                    <span className="crew-name">{details.Actors}</span>
                  </div>
                )}
                {details.Language && details.Language !== "N/A" && (
                  <div className="crew-item">
                    <span className="crew-role">Language</span>
                    <span className="crew-name">{details.Language}</span>
                  </div>
                )}
                {details.Country && details.Country !== "N/A" && (
                  <div className="crew-item">
                    <span className="crew-role">Country</span>
                    <span className="crew-name">{details.Country}</span>
                  </div>
                )}
              </div>

              {details.Awards && details.Awards !== "N/A" && (
                <div className="movie-awards">
                  🏆 {details.Awards}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
