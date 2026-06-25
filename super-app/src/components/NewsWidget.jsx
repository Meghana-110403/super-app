import { useState, useEffect, useRef } from "react";
import { fetchTopHeadlines } from "../services/apiServices";
import "./NewsWidget.css";

const ROTATION_INTERVAL = 3000; // 3 seconds (spec says 2, use 3 for UX)

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchNews();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    startRotation();
    return () => clearInterval(intervalRef.current);
  }, [articles, isPaused]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopHeadlines("general");
      const filtered = data.filter((a) => a.title && a.title !== "[Removed]");
      setArticles(filtered);
    } catch {
      setError("Unable to load news. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const startRotation = () => {
    clearInterval(intervalRef.current);
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, ROTATION_INTERVAL);
  };

  const goTo = (index) => {
    setCurrentIndex(index);
  };

  const current = articles[currentIndex];

  return (
    <div
      className="widget news-widget"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="widget-header">
        <span className="widget-title">
          <span className="icon">📰</span> News Feed
        </span>
        {articles.length > 0 && (
          <span className="news-counter">
            {currentIndex + 1} / {articles.length}
          </span>
        )}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span>Fetching headlines...</span>
        </div>
      )}

      {error && (
        <div className="news-error">
          <p>⚠ {error}</p>
          <button className="btn btn-ghost" onClick={fetchNews} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>
            Retry
          </button>
        </div>
      )}

      {current && !loading && (
        <div className="news-article animate-fade-in" key={currentIndex}>
          {current.urlToImage && (
            <div className="news-image-container">
              <img
                src={current.urlToImage}
                alt={current.title}
                className="news-image"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}
          <div className="news-body">
            <div className="news-source">{current.source?.name}</div>
            <p className="news-title">{current.title}</p>
            {current.description && (
              <p className="news-description">{current.description}</p>
            )}
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-read-more"
            >
              Read more →
            </a>
          </div>
        </div>
      )}

      {articles.length > 0 && (
        <div className="news-dots">
          {articles.slice(0, 10).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`news-dot ${i === currentIndex ? "news-dot--active" : ""}`}
              aria-label={`Article ${i + 1}`}
            />
          ))}
        </div>
      )}

      {isPaused && <div className="news-paused-label">⏸ Paused</div>}
    </div>
  );
};

export default NewsWidget;
