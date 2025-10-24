import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-black text-gray-300 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Connect With Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or want to collaborate? Fill out the form or reach us directly.
          </p>
        </div>

        {/* Grid: Contact Info + Form */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Info Cards */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Mail className="text-blue-400" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <p className="text-gray-400">blogify.support@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Phone className="text-green-400" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <p className="text-gray-400">+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <MapPin className="text-red-400" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-white">Location</h3>
                <p className="text-gray-400">New Delhi, India</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="bg-gray-900 p-8 rounded-xl shadow-md space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Your Message</label>
              <textarea
                placeholder="Type your message..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
