import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar section/Navbar";
import Home from "./components/home section/Home";
import About from "./components/about section/About";
import NoteState from "./context/noteState";
import Login from "./components/login";
import Signup from "./components/signup";
import AuthProvider from "./context/AuthProvider";
import AuthContext from "./context/authContext";
import AlertProvider from "./context/AlertProvider";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <NoteState>
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PrivateRoute>
                      <About />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
