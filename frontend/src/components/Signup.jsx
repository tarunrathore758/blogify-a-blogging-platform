import React, { useState } from "react";
import { NavLink ,useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle signup logic here
    if (fullname && email && password) {
      const userData = { fullname, email, password };
      const existingData = JSON.parse(localStorage.getItem("users")) || [];
      const alreadyUser = existingData.some((user) => user.email === email);
      if (alreadyUser) {
        alert("User already exists");
        return;
      }
      existingData.push(userData);
      localStorage.setItem("users", JSON.stringify(existingData));
      alert("Registration Successful");
      setTimeout(()=>{
        navigate("/login")
      },1000)
    }else{
      alert("All fill all fields")
    }
    fullname("");
    email("");
    password("");
  };
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Stars background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-80"></div>

      {/* signup Card */}
      <div className="relative z-10 bg-white/3 p-8 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Signup
        </h2>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="p-3 rounded-lg bg-white/5 text-white placeholder-gray-300 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
          <p className="text-white text-center">
            Old User ?{" "}
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Login here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
