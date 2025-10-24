import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams(); // get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  // Fetch the blog from backend
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs`);
        const selectedBlog = res.data.find((b) => b._id === id);
        setBlog(selectedBlog);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle likes
  const handleLike = async () => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/blogs/${id}/like`);
      setBlog({ ...blog, likes: res.data.likes });
    } catch (err) {
      console.error(err);
    }
  };

  // Handle adding comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/blogs/${id}/comment`, { text: comment });
      setBlog({ ...blog, comments: res.data.comments });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) return <p className="text-white p-4">Loading blog...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto text-white">
      {/* Blog Image */}
      {blog.image && (
        <img
          src={`http://localhost:5000/${blog.image}`}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
      )}

      {/* Blog Title and Author */}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-400 mb-4">
        By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {/* Blog Content */}
      <p className="mb-4">{blog.content}</p>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 mb-4"
      >
        👍 Like ({blog.likes || 0})
      </button>

      {/* Comments Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <ul className="mb-2 max-h-40 overflow-y-auto">
          {blog.comments.map((c, idx) => (
            <li key={idx} className="mb-1 text-gray-300">
              💬 {c}
            </li>
          ))}
        </ul>

        <form onSubmit={handleComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="w-full p-2 rounded text-black"
          />
          <button
            type="submit"
            className="mt-2 px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetail;
