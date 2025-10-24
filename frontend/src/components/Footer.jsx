import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/10 text-gray-300 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-3">Blogify</h1>
          <p className="text-sm text-gray-400">
            Share your thoughts, read amazing blogs, and connect with the world.  
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          <p className="flex items-center gap-2">
            <Mail size={18} /> blogify@gmail.com
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Phone size={18} /> +91 9876543210
          </p>
        </div>

        {/* Social Links */}
        <div >
          <h2 className="text-lg font-semibold text-white  mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook size={22} /></a>
            <a href="#" className="hover:text-white"><Twitter size={22} /></a>
            <a href="#" className="hover:text-white"><Instagram size={22} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={22} /></a>
            <a href="#" className="hover:text-white"><Github size={22} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
