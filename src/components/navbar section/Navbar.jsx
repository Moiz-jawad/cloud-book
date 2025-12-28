import React, { useEffect, useContext } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  useEffect(() => {
    // Route change side‑effects could go here if needed
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CloudBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

            <div className="ms-auto d-flex align-items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <button className="btn btn-dark text-muted mx-1">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-info text-dark">Signup</button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="fw-semibold text-muted small me-2">
                    {user?.name ? `Hi, ${user.name}` : "Logged in"}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
