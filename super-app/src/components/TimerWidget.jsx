import { useState, useEffect, useRef, useCallback } from "react";
import "./TimerWidget.css";

const TimerWidget = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef(null);

  const clearTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [isRunning, clearTimer]);

  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total === 0) return;
    if (!hasStarted) {
      setTotalSeconds(total);
      setRemaining(total);
      setHasStarted(true);
    }
    setIsFinished(false);
    setIsRunning(true);
  };

  const handlePause = () => {
    clearTimer();
    setIsRunning(false);
  };

  const handleReset = () => {
    clearTimer();
    setIsRunning(false);
    setIsFinished(false);
    setHasStarted(false);
    setRemaining(0);
    setTotalSeconds(0);
  };

  const displayTotal = hasStarted ? totalSeconds : hours * 3600 + minutes * 60 + seconds;
  const progress = displayTotal > 0 ? (1 - remaining / displayTotal) * 100 : 0;

  const displayH = Math.floor(remaining / 3600);
  const displayM = Math.floor((remaining % 3600) / 60);
  const displayS = remaining % 60;

  const pad = (n) => String(n).padStart(2, "0");

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="widget timer-widget">
      <div className="widget-header">
        <span className="widget-title">
          <span className="icon">⏱</span> Countdown Timer
        </span>
        {isFinished && (
          <span className="timer-finished-badge">⏰ Time's up!</span>
        )}
      </div>

      <div className="timer-body">
        {/* SVG ring */}
        <div className="timer-ring-container">
          <svg className="timer-ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="ring-bg" />
            <circle
              cx="60" cy="60" r="54"
              className={`ring-progress ${isFinished ? "ring-finished" : ""} ${isRunning ? "ring-running" : ""}`}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
              }}
            />
          </svg>
          <div className="timer-display">
            <span className="timer-digits">
              {pad(displayH)}:{pad(displayM)}:{pad(displayS)}
            </span>
            <span className="timer-status">
              {isFinished ? "Done!" : isRunning ? "Running" : hasStarted ? "Paused" : "Ready"}
            </span>
          </div>
        </div>

        {/* Input row */}
        {!hasStarted && (
          <div className="timer-inputs">
            <div className="timer-input-group">
              <input
                type="number"
                min={0}
                max={23}
                value={hours}
                onChange={(e) => setHours(Math.max(0, Math.min(23, +e.target.value)))}
                className="timer-number-input"
              />
              <label>HH</label>
            </div>
            <span className="timer-colon">:</span>
            <div className="timer-input-group">
              <input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, +e.target.value)))}
                className="timer-number-input"
              />
              <label>MM</label>
            </div>
            <span className="timer-colon">:</span>
            <div className="timer-input-group">
              <input
                type="number"
                min={0}
                max={59}
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, +e.target.value)))}
                className="timer-number-input"
              />
              <label>SS</label>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="timer-controls">
          {!isRunning ? (
            <button
              className="btn btn-primary"
              onClick={handleStart}
              disabled={!hasStarted && hours === 0 && minutes === 0 && seconds === 0}
            >
              {hasStarted && remaining > 0 ? "▶ Resume" : "▶ Start"}
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={handlePause}>
              ⏸ Pause
            </button>
          )}
          <button className="btn btn-ghost" onClick={handleReset} disabled={!hasStarted && !isFinished}>
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
