import axios from "axios";

const api = axios.create({
  baseURL: "https://cvsu-loan-server.herokuapp.com/",
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
