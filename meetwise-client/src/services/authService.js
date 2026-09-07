import api from "./api";

const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

const register = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  const response = await api.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

const refreshToken = async (refreshToken) => {
  const response = await api.post("/auth/refresh-token", {
    refreshToken,
  });

  return response.data;
};

const authService = {
  login,
  register,
  getCurrentUser,
  refreshToken,
};

export default authService;