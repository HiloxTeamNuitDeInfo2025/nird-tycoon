import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser({ token: data.token });
    return data;
  };

const register = async (firstname, lastname, email, password) => {
    // 1. Register
    await api.post("/auth/register", {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      password,
    });

    // 2. Auto-login
    await login(email, password);

    // 3. SET ROLE TO INITIAL — AUTOMATICALLY
    try {
      await api.patch("/user/current/setrole", {
        role: "INITIAL",
        isProprietary: true // or false — doesn't matter at start
      });
      console.log("Role set to INITIAL");
    } catch (err) {
      console.warn("Could not set initial role — will be set later");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);