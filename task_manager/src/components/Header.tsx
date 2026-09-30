import { LOGO_URL } from "../utils/constants"
import { Link, useNavigate } from "react-router"

export const Header = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const user = currentUser ? JSON.parse(currentUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo">
        <img className="logo-image" src={LOGO_URL} />
      </div>
      <h1 className="header-title">Task Manager App</h1>
      <div className="header-auth">
        {user ? (
          <>
            <span className="auth-user">Hello, {user.name}</span>
            <h2 className="role">{user.role}</h2>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  )
}