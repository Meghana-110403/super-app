import { useStore } from "../store/useStore";
import "./UserProfileWidget.css";

const UserProfileWidget = () => {
  const { user, categories } = useStore();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="widget user-profile-widget">
      <div className="widget-header">
        <span className="widget-title">
          <span className="icon">👤</span> Profile
        </span>
      </div>

      <div className="profile-avatar">
        <span className="avatar-initials">{initials}</span>
      </div>

      <div className="profile-info">
        <h3 className="profile-name">{user.name}</h3>
        <span className="profile-username">@{user.username}</span>
      </div>

      <div className="profile-details">
        <div className="profile-detail-item">
          <span className="detail-icon">✉</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="profile-detail-item">
          <span className="detail-icon">📱</span>
          <span className="detail-value">{user.mobile}</span>
        </div>
      </div>

      <div className="profile-categories">
        <p className="categories-label">Your Interests</p>
        <div className="categories-chips">
          {categories.map((cat) => (
            <span key={cat} className="badge badge-accent category-chip">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileWidget;
