import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../services/authService";
import { userProfile } from "../utils/userProfile";
interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);
      if (response && (response as Response).ok) {
        const data = await (response as Response).json();
        const decodedData = userProfile(data.access)
        localStorage.setItem("currentUser", JSON.stringify(decodedData));
        localStorage.setItem("token", data.access);
        navigate("/");
      } else {
        const data = await (response as Response).json().catch(() => ({}));
        setError(data.message || "Invalid email or password");
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
          <h2>Welcome back</h2>
          <p>Sign in to your account</p>
        </div>
        {error && <div className="auth-alert auth-alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
