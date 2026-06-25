import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import "./Register.css";

const Register = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const alphaPattern = /^[a-zA-Z\s]+$/;
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;

    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (!alphaPattern.test(value.trim())) return "Name must contain only letters.";
        return "";
      case "username":
        if (!value.trim()) return "Username is required.";
        if (!alphanumericPattern.test(value.trim())) return "Username must be alphanumeric with no spaces.";
        if (value.length < 3) return "Username must be at least 3 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!emailPattern.test(value)) return "Please enter a valid email address.";
        return "";
      case "mobile":
        if (!value.trim()) return "Mobile number is required.";
        if (!phonePattern.test(value)) return "Mobile must be exactly 10 digits.";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, username: true, email: true, mobile: true });
    if (validateForm()) {
      setUser(formData);
      navigate("/categories");
    }
  };

  const fields = [
    { name: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
    { name: "username", label: "Username", placeholder: "johndoe123", type: "text" },
    { name: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
    { name: "mobile", label: "Mobile Number", placeholder: "9876543210", type: "text", maxLength: 10 },
  ];

  return (
    <div className="register-page">
      {/* Left panel */}
      <div className="register-art">
        <div className="register-art__content">
          <div className="register-art__logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">SuperApp</span>
          </div>
          <h1 className="register-art__headline">
            Everything you need.<br />In one place.
          </h1>
          <p className="register-art__sub">
            Weather, news, entertainment, and productivity tools — personalized for you.
          </p>
          <div className="register-art__features">
            {["🌤 Live Weather Updates", "📰 Real-time News Feed", "🎬 Movie Recommendations", "⏱ Countdown Timer", "📝 Smart Notes"].map((f) => (
              <div key={f} className="feature-pill">{f}</div>
            ))}
          </div>
        </div>
        <div className="register-art__bg-orb orb-1" />
        <div className="register-art__bg-orb orb-2" />
      </div>

      {/* Right panel - form */}
      <div className="register-form-panel">
        <div className="register-form-container animate-slide-up">
          <div className="register-form-header">
            <h2>Create your account</h2>
            <p>Set up your profile to personalize your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            {fields.map((field) => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors[field.name] && touched[field.name] ? "error" : ""}`}
                  autoComplete="off"
                />
                {errors[field.name] && touched[field.name] && (
                  <span className="error-text" role="alert">
                    ⚠ {errors[field.name]}
                  </span>
                )}
              </div>
            ))}

            <button type="submit" className="btn btn-primary register-submit-btn">
              Continue to Category Selection →
            </button>
          </form>

          <p className="register-step-indicator">
            <span className="step active">1</span>
            <span className="step-line" />
            <span className="step">2</span>
            <span className="step-line" />
            <span className="step">3</span>
          </p>
          <p className="step-label">Registration → Categories → Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
