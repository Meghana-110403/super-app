import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import "./Categories.css";

const CATEGORIES = [
  { id: "action", label: "Action", emoji: "💥", color: "#ff6b6b" },
  { id: "comedy", label: "Comedy", emoji: "😂", color: "#ffb347" },
  { id: "drama", label: "Drama", emoji: "🎭", color: "#6c63ff" },
  { id: "music", label: "Music", emoji: "🎵", color: "#00d4aa" },
  { id: "sports", label: "Sports", emoji: "⚽", color: "#4ecdc4" },
  { id: "thriller", label: "Thriller", emoji: "🔍", color: "#c084fc" },
  { id: "fantasy", label: "Fantasy", emoji: "🧙", color: "#f59e0b" },
  { id: "romance", label: "Romance", emoji: "💝", color: "#f472b6" },
];

const MIN_SELECTIONS = 3;

const Categories = () => {
  const { user, setCategories } = useStore();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggleCategory = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setCategories(selected);
    navigate("/dashboard");
  };

  const canContinue = selected.length >= MIN_SELECTIONS;

  return (
    <div className="categories-page">
      <div className="categories-header animate-fade-in">
        <div className="logo-inline">
          <span>⚡</span> SuperApp
        </div>
        <div className="categories-title-block">
          <h1>What do you enjoy?</h1>
          <p>
            Hi <strong>{user.name}</strong>, select at least{" "}
            <strong>{MIN_SELECTIONS} categories</strong> to personalize your dashboard.
          </p>
        </div>
        <div className="selection-counter">
          <span
            className={`counter-badge ${canContinue ? "counter-badge--ready" : ""}`}
          >
            {selected.length} / {MIN_SELECTIONS} min
          </span>
        </div>
      </div>

      <div className="categories-grid animate-slide-up">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => toggleCategory(cat.id)}
            className={`category-card ${selected.includes(cat.id) ? "category-card--selected" : ""}`}
            style={{ "--cat-color": cat.color, animationDelay: `${i * 50}ms` }}
            aria-pressed={selected.includes(cat.id)}
          >
            <div className="category-card__check">
              {selected.includes(cat.id) && <span>✓</span>}
            </div>
            <span className="category-card__emoji">{cat.emoji}</span>
            <span className="category-card__label">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="categories-footer animate-fade-in">
        {!canContinue && (
          <p className="selection-hint">
            Select {MIN_SELECTIONS - selected.length} more to continue
          </p>
        )}
        <button
          className="btn btn-primary categories-continue-btn"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          {canContinue
            ? `Continue with ${selected.length} categories →`
            : `Select ${MIN_SELECTIONS - selected.length} more`}
        </button>
      </div>
    </div>
  );
};

export default Categories;
