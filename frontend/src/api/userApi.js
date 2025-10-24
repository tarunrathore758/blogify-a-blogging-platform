import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
});

export const getUsers   = ()      => API.get("/admin/users");
export const deleteUser = (id)    => API.delete(`/admin/users/${id}`);
