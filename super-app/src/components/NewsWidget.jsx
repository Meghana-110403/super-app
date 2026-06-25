import { useState, useEffect, useRef } from "react";
import "./NewsWidget.css";

const MOCK_ARTICLES = [
  {
    title: "Global Tech Summit 2026 Unveils Next-Gen AI Breakthroughs",
    description: "Leaders from top technology companies gathered to showcase revolutionary artificial intelligence tools that promise to reshape industries worldwide.",
    source: { name: "Tech Today" },
    url: "#",
    urlToImage: null,
  },
  {
    title: "Renewable Energy Hits Record High Across Asia Pacific",
    description: "Solar and wind energy production reached an all-time high this quarter, with countries across Asia Pacific leading the green energy transition.",
    source: { name: "Energy World" },
    url: "#",
    urlToImage: null,
  },
  {
    title: "Scientists Discover New Deep-Sea Species in Pacific Ocean",
    description: "Marine biologists have identified over 30 previously unknown species during a landmark deep-sea expedition, expanding our understanding of ocean biodiversity.",
    source: { name: "Science Daily" },
    url: "#",
    urlToImage: null,
  },
  {
    title: "Global Markets Rally as Inflation Data Shows Improvement",
    description: "Stock markets around the world surged after new economic data indicated inflation is cooling faster than expected, boosting investor confidence.",
    source: { name: "Financial Times" },
    url: "#",
    urlToImage: null,
  },
  {
    title: "Space Agency Announces Crewed Mission to Mars by 2030",
    description: "In a landmark announcement, the international space coalition confirmed plans to send the first crewed mission to Mars within the next four years.",
    source: { name: "Space News" },
    url: "#",
    urlToImage: null,
  },
  {
    title: "Breakthrough in Quantum Computing Achieves New Milestone",
    description: "Researchers have demonstrated quantum supremacy at room temperature, a development that could accelerate the commercialization of quantum computers.",
    source: { name: "Tech Review" },
    url: "#",
    urlToImage: null,
  },
  {
    title: "New Study Links Mediterranean Diet to Longer Lifespan",
    description: "A comprehensive 20-year study confirms that adherence to a Mediterranean diet significantly reduces the risk of chronic disease and extends life expectancy.",
    source: { name: "Health Weekly" },
    url: "#",
    urlToImage: null,
  },
  {
    title: "Electric Vehicle Sales Surpass Petrol Cars for First Time",
    description: "For the first time in automotive history, electric vehicles outsold traditional petrol-powered cars globally, marking a major milestone in sustainable transport.",
    source: { name: "Auto News" },
    url: "#",
    urlToImage: null,
  },
];

const ROTATION_INTERVAL = 3000;

const NewsWidget = () => {
  const [articles] = useState(MOCK_ARTICLES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, articles.length]);

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
        <span className="news-counter">
          {currentIndex + 1} / {articles.length}
        </span>
      </div>

      <div className="news-article animate-fade-in" key={currentIndex}>
        <div className="news-body">
          <div className="news-source">{current.source.name}</div>
          <p className="news-title">{current.title}</p>
          <p className="news-description">{current.description}</p>
        </div>
      </div>

      <div className="news-dots">
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`news-dot ${i === currentIndex ? "news-dot--active" : ""}`}
            aria-label={`Article ${i + 1}`}
          />
        ))}
      </div>

      {isPaused && <div className="news-paused-label">⏸ Paused</div>}
    </div>
  );
};

export default NewsWidget;