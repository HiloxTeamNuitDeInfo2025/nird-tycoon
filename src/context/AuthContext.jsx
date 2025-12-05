import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("nird_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("nird_users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Mauvais email ou mot de passe");

    const userData = { ...found, token: "fake" };
    localStorage.setItem("nird_user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (firstname, lastname, email, password) => {
    let users = JSON.parse(localStorage.getItem("nird_users") || "[]");

    if (users.find(u => u.email === email)) {
      throw new Error("Cet email existe déjà");
    }

    const newUser = {
      id: Date.now(),
      firstname,
      lastname,
      email,
      password,
      role: "INITIAL",
      isProprietary: true
    };

    users.push(newUser);
    localStorage.setItem("nird_users", JSON.stringify(users));

    // auto-login
    const userData = { ...newUser, token: "fake" };
    localStorage.setItem("nird_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("nird_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);