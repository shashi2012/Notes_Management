import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile on app startup if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data);
      } catch (error) {
        console.error("Token expired or invalid");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data);
      toast.success(`Welcome back, ${data.name}! 🚀`);
      return true; // Success status
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };
  const registerUser = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      setUser(data);
      toast.success(`Account created successfully! Welcome ${data.name} 🎉`);
      return true; // Success
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false; // Failed
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out safely");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout,registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};