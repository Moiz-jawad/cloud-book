import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      await login(form.email.trim(), form.password.trim());

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="row w-100" style={{ maxWidth: "900px" }}>
        {/* Left side - brand text like Facebook */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center mb-4 mb-md-0">
          <h1 className="display-4 fw-bold mb-3" style={{ color: "#fff" }}>
            CloudBook
          </h1>
          <p className="fs-5 text-muted mb-0">
            Log in to continue saving and organizing your notes in one secure
            place.
          </p>
        </div>

        {/* Right side - login card */}
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="card glass-card shadow-sm border-0 p-4 p-md-5 hover-lift w-100"
            style={{ maxWidth: "380px" }}
          >
            <h4 className="mb-4 text-center text-secondary fw-semibold">
              Log In
            </h4>

            {error && (
              <div className="alert alert-danger py-2 mb-3">{error}</div>
            )}

            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label text-secondary fw-medium"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-md"
                id="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label text-secondary fw-medium"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-md"
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-grid my-2">
              <button
                type="submit"
                className="btn btn-primary fw-semibold"
                style={{ backgroundColor: "#1877f2", borderColor: "#1877f2" }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>

            <div className="text-center mt-3">
              <Link to="/signup" className="small text-muted">
                Create a new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
