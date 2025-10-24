import React from "react";
import { Users, PenTool, Globe, Shield } from "lucide-react";

const About = () => {
  const aboutItems = [
    {
      icon: <Users size={28} />,
      title: "Community",
      description: "Blogify connects writers and readers, creating a community of thinkers, learners, and creators."
    },
    {
      icon: <PenTool size={28} />,
      title: "Easy Writing",
      description: "Create and publish blogs effortlessly with our user-friendly editor designed for everyone."
    },
    {
      icon: <Globe size={28} />,
      title: "Global Reach",
      description: "Your words matter! Share your blogs worldwide and connect with audiences across the globe."
    },
    {
      icon: <Shield size={28} />,
      title: "Secure & Reliable",
      description: "We value your privacy. Blogify ensures secure access and safe content sharing."
    }
  ];

  return (
    <section className="bg-black text-gray-300 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">About Blogify</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Blogify is a modern blogging platform where you can share your ideas, connect with readers, 
          and explore content from creators worldwide.
        </p>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
              <div className="text-blue-400 mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
