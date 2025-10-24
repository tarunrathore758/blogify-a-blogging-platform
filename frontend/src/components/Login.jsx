import React, { useState,useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("please fill all fields");
      return;
    }
    const data = JSON.parse(localStorage.getItem("users")) || [];
    console.log(data);
    const userData = data.find(
      (user) => user.email === email && user.password === password
    );
    if (userData) {
      login(userData); 
      localStorage.setItem("login", email);
      setEmail(email);
      console.log("user logged in");
      alert("Login Successful");
      navigate("/dashboard");
    }else{
      alert("Invalid Credentials");
      return;
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Stars background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-80"></div>

      {/* Animated clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[200%] h-full bg-[url('https://www.transparenttextures.com/patterns/clouds.png')] animate-clouds"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/3 p-8 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 rounded-lg bg-white/5 text-white placeholder-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/5 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="p-3 rounded-lg hover:bg-blue-700 transition duration-600 hover:scale-115 text-white font-semibold"
          >
            Log In
          </button>

          <p className="text-white text-center">
            New User ?{" "}
            <NavLink to="/register" className="text-blue-500 hover:underline">
              Sign up here
            </NavLink>
          </p>
        </form>
      </div>

      {/* Extra CSS for clouds animation */}
      <style>
        {`
          @keyframes moveClouds {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-clouds {
            background-size: cover;
            animation: moveClouds 60s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
