import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  FiHome, FiFileText, FiUser, FiSearch, FiSettings, FiLogOut, FiUsers,
} from "react-icons/fi";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { createBlog, getBlogs, likeBlog, commentBlog } from "../api/blogApi";
import { getUsers, deleteUser } from "../api/userApi";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [active, setActive] = useState("home");
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const menuItems = [
    { id: "home", label: "Home", icon: <FiHome /> },
    { id: "myBlogs", label: "My Blogs", icon: <FiFileText /> },
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "search", label: "Search Blogs", icon: <FiSearch /> },
    { id: "users", label: "Manage Users (Admin)", icon: <FiUsers /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  // Load blogs
  useEffect(() => {
    (async () => {
      try {
        const res = await getBlogs();
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    })();
  }, []);

  // Load users (admin panel)
  useEffect(() => {
    if (active !== "users") return;
    (async () => {
      try {
        const res = await getUsers();
        setUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    })();
  }, [active]);

  const handleAddBlog = async () => {
    if (!title || !content) return alert("Title & Content required!");
    try {
      const payload = {
        title,
        content,
        image: imageUrl || null,
        author: user?.fullname || user?.name || "Anonymous",
      };
      const res = await createBlog(payload);
      setBlogs([res.data, ...blogs]);
      setTitle("");
      setContent("");
      setImageUrl("");
      alert("Blog published ✅");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to publish blog. Check backend console & Network tab.");
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await likeBlog(id);
      setBlogs((prev) => prev.map((b) => (b._id === id ? res.data : b)));
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleComment = async (id) => {
    if (!commentText.trim()) return;
    try {
      const res = await commentBlog(id, commentText.trim());
      setBlogs((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      setCommentText("");
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "blog_preset");
      formData.append("cloud_name", "diopwezq3");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/diopwezq3/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const t = (b.title || "").toLowerCase();
    const c = (b.content || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    return t.includes(q) || c.includes(q);
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 text-white bg-white/10 shadow-xl flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-600">Blogify</div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center w-full px-3 py-2 rounded-xl text-left transition 
                ${active === item.id ? "bg-blue-500 text-white" : "text-white hover:bg-purple-900"}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 mb-4 text-red-500 hover:bg-red-500 hover:text-white rounded-xl"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Welcome */}
        <div className="px-1 mb-4">
          {user && (
            <p className="text-sm text-white">
              Welcome, <span className="font-semibold text-2xl text-cyan-100">{user.fullname}</span>
            </p>
          )}
        </div>

        {/* Home */}
        {active === "home" && (
          <div>
            <h1 className="text-2xl text-blue-500 font-bold mb-4">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/10 rounded-2xl shadow">
                <h2 className="text-lg font-semibold text-gray-100">Total Blogs</h2>
                <p className="mt-2 text-3xl font-bold text-blue-600">{blogs.length}</p>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl shadow">
                <h2 className="text-lg font-semibold text-gray-100">Total Likes</h2>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  {blogs.reduce((sum, b) => sum + (b.likes || 0), 0)}
                </p>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl shadow">
                <h2 className="text-lg font-semibold text-gray-100">Comments</h2>
                <p className="mt-2 text-3xl font-bold text-purple-600">
                  {blogs.reduce((sum, b) => sum + (b.comments?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* My Blogs */}
        {active === "myBlogs" && (
          <div>
            <h1 className="text-2xl text-blue-500 font-bold mb-4">My Blogs</h1>

            <div className="p-6 bg-white/20 rounded-2xl shadow mb-6">
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mb-3 border font-bold text-2xl shadow rounded-lg text-black"
              />
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your blog content here..."
                className="mb-3 bg-gray-200"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-3 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                           file:rounded-lg file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />

              {loading ? (
                <p className="text-gray-200 mb-3">Uploading...</p>
              ) : (
                imageUrl && (
                  <div className="mb-3">
                    <img src={imageUrl} alt="Uploaded" className="w-40 h-40 object-cover rounded-lg shadow" />
                  </div>
                )
              )}

              <button onClick={handleAddBlog} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Publish
              </button>
            </div>

            <div className="space-y-6">
              {blogs.map((blog) => (
                <div key={blog._id} className="p-6 bg-white/10 rounded-2xl shadow">
                  {blog.image && (
                    <img src={blog.image} alt={blog.title} className="w-40 h-40 object-cover rounded-lg" />
                  )}
                  <h2 className="text-2xl text-purple-700 font-bold">{blog.title}</h2>
                  <div
                    className="mt-2 text-white"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  <p className="text-sm text-gray-400 mb-2">📅 {new Date(blog.createdAt).toLocaleString()}</p>

                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleLike(blog._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg"
                    >
                      👍 {blog.likes}
                    </button>
                  </div>

                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full p-2 border text-black shadow rounded-lg"
                    />
                    <button
                      onClick={() => handleComment(blog._id)}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
                    >
                      Comment
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {(blog.comments || []).map((c, i) => (
                      <p key={i} className="text-gray-100">💬 {c}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile */}
        {active === "profile" && (
          <div>
            <h1 className="text-2xl text-blue-500 font-bold mb-4">My Profile</h1>
            <div className="p-6 bg-white/10 text-white rounded-2xl shadow">
              {user ? (
                <>
                  <p><span className="font-semibold">Name:</span> {user.fullname}</p>
                  <p><span className="font-semibold">Email:</span> {user.email}</p>
                  <p><span className="font-semibold">Total Blogs:</span> {blogs.length}</p>
                </>
              ) : (<p>No user logged in.</p>)}
            </div>
          </div>
        )}

        {/* Search */}
        {active === "search" && (
          <div>
            <h1 className="text-2xl text-blue-500 font-bold mb-4">Search Blogs</h1>
            <input
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 mb-4 border rounded-xl text-black focus:ring-2 focus:ring-blue-400"
            />
            <div className="space-y-6">
              {filteredBlogs.map((blog) => (
                <div key={blog._id} className="p-4 bg-white/10 rounded-xl shadow">
                  <h2 className="text-xl font-bold text-purple-500">{blog.title}</h2>
                  <div
                    className="mt-2 text-white"
                    dangerouslySetInnerHTML={{ __html: (blog.content || "").slice(0, 120) + "..." }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin */}
        {active === "users" && (
          <div>
            <h1 className="text-2xl text-blue-500 font-bold mb-4">Manage Users (Admin)</h1>
            <div className="p-6 bg-white/10 text-white rounded-2xl shadow space-y-2">
              {users.map((u) => (
                <div key={u._id} className="flex items-center justify-between">
                  <span>{u.fullname} — {u.email}</span>
                  <button
                    className="text-red-500 hover:text-white hover:bg-red-600 px-3 py-1 rounded"
                    onClick={async () => {
                      await deleteUser(u._id);
                      setUsers((prev) => prev.filter((x) => x._id !== u._id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {users.length === 0 && <p>No users found.</p>}
            </div>
          </div>
        )}

        {/* Settings */}
        {active === "settings" && (
          <div>
            <h1 className="text-2xl text-blue-500 font-bold mb-4">Settings</h1>
            <div className="p-6 bg-white/10 text-white rounded-2xl shadow">
              <p>Light Mode (Coming Soon)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
