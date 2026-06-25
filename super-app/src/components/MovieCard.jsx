import "./MovieCard.css";

const PLACEHOLDER_POSTER = "https://via.placeholder.com/200x300/1a1e2a/6c63ff?text=No+Poster";

const MovieCard = ({ movie, onClick }) => {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_POSTER;

  return (
    <article className="movie-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}>
      <div className="movie-card__poster-wrap">
        <img
          src={poster}
          alt={movie.Title}
          className="movie-card__poster"
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER_POSTER; }}
        />
        <div className="movie-card__overlay">
          <span className="movie-card__view-btn">View Details</span>
        </div>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <span className="movie-card__year">{movie.Year}</span>
      </div>
    </article>
  );
};

export default MovieCard;
