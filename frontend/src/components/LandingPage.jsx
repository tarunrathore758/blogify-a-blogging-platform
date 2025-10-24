import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BlogCards from "./BlogCards";
import axios from "axios";

const LandingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);



  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading blogs...</p>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col justify-center items-center relative bg-transparent px-4 py-6">
        <p className="text-center font-serif text-transparent bg-clip-text pt-30 bg-gradient-to-r from-purple-400 via-orange-400 to-orange-200 max-w-2xl">
          Start Your Blogging Journey Today
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
          Stories Under the Stars
        </h1>
        <p className="text-white text-center mb-8 max-w-2xl">
          A space to share inspiration, creativity, and experiences.
        </p>
        <NavLink to="/login">
          <button className="font-serif text-center bg-gradient-to-r from-purple-400 via-orange-400 to-orange-200 rounded-full text-black p-4 hover:scale-105 hover:cursor-pointer hover:brightness-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.9)] transition duration-300">
            CREATE YOUR BLOG
          </button>
        </NavLink>
      </div>

      <section className="relative z-10 p-12 flex justify-center">
        <div className="max-w-6xl w-full">
          <BlogCards data={blogs} />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
