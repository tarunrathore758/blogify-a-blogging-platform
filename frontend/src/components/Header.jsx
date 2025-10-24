import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
       const handleScroll =()=>{
      if(window.scrollY > 30){
        setScrollY(true)
      }else{
        setScrollY(false)
      }
    };
     window.addEventListener("scroll", handleScroll);
    return()=>window.removeEventListener("scroll",handleScroll);
  })

  return (
    <div className={`flex fixed justify-between items-center bg-transparent top-0 left-0 right-0 z-50  container mx-auto px-4 py-4 ${scrollY ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      {/* logo */}
      <div className=" text-white flex  space-x-2 item-center ">
        <img src="./blogLogo.png" className="h-12 w-14 scale-150" />
        <h1 className=" pt-1 text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500  to-pink-500 drop-shadow-md">Blogify</h1>
      </div>

       {/* <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-12 w-12" />
                <span className="text-2xl font-bold text-blue-600">
                  Excel Analytics
                </span>
              </div> */}


      {/* Navigation  for desktop*/}
      <nav className="gap-2 hidden md:flex ">
        <NavLink
          to="/"
          className="pt-2 px-4 text-gray-300 border border-transparent p-2 transition-color duration-400 hover:border-purple-500 hover:rounded-xl"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="pt-2 px-4 text-gray-300 border border-transparent p-2 transition-all duration-400 hover:border-purple-500 hover:rounded-xl"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="pt-2 px-4 text-gray-300 border border-transparent p-2 transition-all duration-400 hover:border-purple-500 hover:rounded-xl"
        >
          Contact
        </NavLink>
        <NavLink to="/login">
          <button className="font-serif text-center bg-white/20 rounded-xl text-gray-300 p-2 px-4 hover:scale-105 hover:cursor-pointer transition duration-400 border border-transparent hover:border-purple-500 ">
            Sign In
          </button>
        </NavLink>
      </nav>
      {/* hamburger */}
      <div
        className="md:hidden text-white text-2xl  cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22}  />}
      </div>
      {open && (
        <div className="absolute top-16 left-0 w-full h-screen bg-black text-white p-4 flex flex-col items-center gap-4  md-hidden">
          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <div className="bg-white/10 bg-blur w-full h-[1px]"></div>
          <NavLink
            to="/login"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            <button className="font-serif text-center bg-white/20 rounded-xl text-white w-full p-2 px-4 hover:scale-105 hover:cursor-pointer transition duration-400 border border-transparent hover:border-purple-500 ">
              Sign In{" "}
            </button>
            <NavLink
              to="/register"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <button className="font-serif text-center bg-white/20 rounded-xl text-white w-full p-2 px-4 hover:scale-105 hover:cursor-pointer transition duration-400 border border-transparent hover:border-purple-500 mt-2 ">
                Sign Up{" "}
              </button>
            </NavLink>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
