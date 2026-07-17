import axios from "axios";

const TOKEN_STORAGE_KEY = "jwt_token";
const USER_STORAGE_KEY = "user_data";

const getAuthToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

const getCurrentUser = () => {
  const rawUser = localStorage.getItem(USER_STORAGE_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

const api = axios.create({
  baseURL: "https://serverless-api-teal.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const storedToken = getAuthToken();
if (storedToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
}

const login = (email, password) => api.post("/api/auth/signin", { email, password });

const setAuthData = (token, user) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeAuthData = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  delete api.defaults.headers.common["Authorization"];
};

export { api as default, login, setAuthData, getAuthToken, getCurrentUser, removeAuthData };
