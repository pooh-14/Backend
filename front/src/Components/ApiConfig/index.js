import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
  baseURL: "https://end-esw7.onrender.com",
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
