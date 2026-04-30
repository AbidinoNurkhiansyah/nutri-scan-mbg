import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Base instance configured for backend API
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL of backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach token if exists
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
