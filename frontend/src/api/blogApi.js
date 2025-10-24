import axios from "axios";

// 🔥 Hardcode backend URL to avoid Vite env issues
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Blogs
export const createBlog  = (blogData) => API.post("/blogs", blogData);
export const getBlogs    = ()          => API.get("/blogs");
export const likeBlog    = (id)        => API.put(`/blogs/${id}/like`);
export const commentBlog = (id, text)  => API.post(`/blogs/${id}/comment`, { text });

export default API;
