import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import UserProfileWidget from "../components/UserProfileWidget";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import TimerWidget from "../components/TimerWidget";
import NotesWidget from "../components/NotesWidget";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, resetStore } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    resetStore();
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      {/* Top Nav */}
      <header className="dashboard-nav">
        <div className="dashboard-nav__brand">
          <span>⚡</span>
          <span>SuperApp</span>
        </div>
        <div className="dashboard-nav__actions">
          <button
            className="btn btn-ghost"
            onClick={() => navigate("/movies")}
          >
            🎬 Movies
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard greeting */}
      <div className="dashboard-greeting animate-fade-in">
        <h1>
          Good {getTimeOfDay()},{" "}
          <span className="greeting-name">{user.name}</span> 👋
        </h1>
        <p>Here's your personalized dashboard</p>
      </div>

      {/* Widget Grid */}
      <div className="dashboard-grid animate-slide-up">
        {/* Row 1 */}
        <div className="widget-col widget-col--profile">
          <UserProfileWidget />
        </div>
        <div className="widget-col widget-col--weather">
          <WeatherWidget />
        </div>
        <div className="widget-col widget-col--news">
          <NewsWidget />
        </div>

        {/* Row 2 */}
        <div className="widget-col widget-col--timer">
          <TimerWidget />
        </div>
        <div className="widget-col widget-col--notes">
          <NotesWidget />
        </div>
      </div>
    </div>
  );
};

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

export default Dashboard;
