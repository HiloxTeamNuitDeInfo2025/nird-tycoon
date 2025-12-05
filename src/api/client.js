import axios from "axios";

const api = axios.create({
  baseURL: "", 
  timeout: 10000,
});

// JWT Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;