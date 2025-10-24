import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { NavLink } from "react-router-dom";

const BlogCards = ({ data }) => {
  const [blogs, setBlogs] = useState(data); // local state for updates
  const [commentTexts, setCommentTexts] = useState({}); // individual comment inputs

  // Like handler
  const handleLike = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/blogs/${id}/like`);
      setBlogs(
        blogs.map((b) => (b._id === id ? { ...b, likes: res.data.likes } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Comment handler
  const handleComment = async (id) => {
    const text = commentTexts[id];
    if (!text) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/blogs/${id}/comment`, { text });
      setBlogs(
        blogs.map((b) => (b._id === id ? { ...b, comments: res.data.comments } : b))
      );
      setCommentTexts({ ...commentTexts, [id]: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 text-white gap-6 p-4 relative z-10">
      {blogs.map((blog, index) => {
        let initialX = 0;
        let initialY = 0;
        if (index % 3 === 0) initialX = -100;
        else if (index % 3 === 1) initialX = 100;
        else initialY = 100;

        return (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, x: initialX, y: initialY }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="transition duration-300 bg-white/10 p-4 rounded-lg hover:scale-105 flex flex-col"
          >
            {blog.image && (
              <img
                src={`http://localhost:5000/${blog.image}`}
                alt={blog.title}
                className="rounded w-full h-[136px] object-cover"
              />
            )}

            <h2 className="text-white text-lg font-semibold mt-3 line-clamp-2">
              {blog.title}
            </h2>
            <p className="font-serif text-gray-200 flex-grow line-clamp-3">
              {blog.content}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            {/* Read More link */}
            <NavLink
              to={`/blog/${blog._id}`}
              className="text-blue-400 hover:underline mt-3 inline-block"
            >
              Read More →
            </NavLink>

            {/* Likes */}
            <button
              onClick={() => handleLike(blog._id)}
              className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 mt-2"
            >
              👍 Like ({blog.likes || 0})
            </button>

            {/* Comments */}
            <div className="mt-2">
              <ul className="mb-2 max-h-24 overflow-y-auto">
                {blog.comments.map((c, idx) => (
                  <li key={idx} className="text-gray-300 text-sm">
                    💬 {c}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Add a comment"
                value={commentTexts[blog._id] || ""}
                onChange={(e) =>
                  setCommentTexts({ ...commentTexts, [blog._id]: e.target.value })
                }
                className="w-full p-2 rounded text-black"
              />
              <button
                onClick={() => handleComment(blog._id)}
                className="mt-1 px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
              >
                Comment
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BlogCards;
