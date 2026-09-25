import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();

        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);

    if (response.success) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setUser({
        email: response.data.email,
        fullName: response.data.fullName,
        roles: response.data.roles,
      });
    }

    return response;
  };

  const register = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    const response = await authService.register(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    if (response.success) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setUser({
        email: response.data.email,
        fullName: response.data.fullName,
        roles: response.data.roles,
      });
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};