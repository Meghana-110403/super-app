import { useState } from "react";
import { useStore } from "../store/useStore";
import "./NotesWidget.css";

const NotesWidget = () => {
  const { notes, setNotes } = useStore();
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setNotes(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm("Clear all notes?")) {
      setNotes("");
      setIsSaved(false);
    }
  };

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;
  const charCount = notes.length;

  return (
    <div className="widget notes-widget">
      <div className="widget-header">
        <span className="widget-title">
          <span className="icon">📝</span> Notes
        </span>
        <div className="notes-meta">
          {isSaved && <span className="notes-saved-badge">✓ Saved</span>}
        </div>
      </div>

      <textarea
        className="notes-textarea"
        value={notes}
        onChange={handleChange}
        placeholder="Jot down your thoughts, reminders, or ideas..."
        spellCheck
        aria-label="Notes area"
      />

      <div className="notes-footer">
        <span className="notes-stats">
          {wordCount} words · {charCount} chars
        </span>
        <div className="notes-actions">
          <button
            className="btn btn-ghost notes-btn"
            onClick={handleClear}
            disabled={!notes}
          >
            Clear
          </button>
          <button
            className="btn btn-primary notes-btn"
            onClick={handleSave}
            disabled={!notes}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesWidget;
