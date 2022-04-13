import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export default api;
