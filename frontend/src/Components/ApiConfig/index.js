import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
  baseURL: "https://e-commerce-f7rw.onrender.com",
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
