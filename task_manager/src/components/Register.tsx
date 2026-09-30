import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services/authService";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const Register = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await registerUser(formData);
      if (response && (response as Response).ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const data = await (response as Response).json().catch(() => ({}));
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-card-header">
          <h2>Create an account</h2>
          <p>Register to get started</p>
        </div>
        {error && <div className="auth-alert auth-alert-error">{error}</div>}
        {success && <div className="auth-alert auth-alert-success">{success}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={6}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="developer">Developer</option>
              <option value="tester">Tester</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};