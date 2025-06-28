import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

// Interceptor: Attach token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
