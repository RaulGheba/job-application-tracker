import { createContext, useContext, useState } from "react";
import { login as loginApi, register as registerApi } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const isVerified = localStorage.getItem("isVerified") === "true";
    return token ? { token, email, isVerified } : null;
  });

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("isVerified", data.isVerified);
    setUser({ token: data.token, email: data.email, isVerified: data.isVerified });
  };

  const register = async (email, password) => {
    // register no longer returns a token — just sends the verification email
    await registerApi(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("isVerified");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
