import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alertContext";

const Signup = () => {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:7000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.status) {
        throw new Error(data?.message || "Signup failed");
      }

      setSuccess("Account created successfully. You can log in now.");
      showAlert(
        "success",
        `Welcome, ${form.name.trim()}. Your account is ready, please log in.`,
        4000
      );

      // Optional: redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(err.message || "Something went wrong while signing up.");
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
            Sign up to create your secure space for notes and ideas.
          </p>
        </div>

        {/* Right side - signup card */}
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="card glass-card shadow-sm border-0 p-4 p-md-5 hover-lift w-100"
            style={{ maxWidth: "380px" }}
          >
            <h4 className="mb-3 text-center text-secondary fw-semibold">
              Create a new account
            </h4>

            {error && (
              <div className="alert alert-danger py-2 mb-3">{error}</div>
            )}
            {success && (
              <div className="alert alert-success py-2 mb-3">{success}</div>
            )}

            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label text-secondary fw-medium"
              >
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                id="name"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="New password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-grid my-2">
              <button
                type="submit"
                className="btn fw-semibold"
                style={{
                  backgroundColor: "#42b72a",
                  color: "#fff",
                  borderColor: "#42b72a",
                }}
                disabled={loading}
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
