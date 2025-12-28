import React, { useEffect, useState, useCallback, useContext } from "react";
import AuthContext from "./authContext";
import AlertContext from "./alertContext";

const API_BASE = "http://localhost:7000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useContext(AlertContext);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/v1/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data?.status) {
        logout();
        return null;
      }

      setUser(data.data || null);
      return data.data || null;
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(
    async (email, password) => {
      const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data?.status) {
        throw new Error(data?.message || "Login failed");
      }

      const token = data?.data?.authToken;
      if (!token) {
        throw new Error("Token not received from server");
      }

      localStorage.setItem("token", token);
      const fetchedUser = await fetchUser();

      if (fetchedUser?.name) {
        const firstName = fetchedUser.name.split(" ")[0];
        showAlert(
          "success",
          `Welcome back, ${firstName}. Your workspace is ready.`,
          3500
        );
      } else {
        showAlert("success", "Welcome back. Your workspace is ready.", 3500);
      }
    },
    [fetchUser, showAlert]
  );

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
