import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-[#17181A] border border-[#2E3035] rounded-2xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-[#EAEAEA] mb-3">
            Learn with curated educational content
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-6">
            Access hand-picked videos from trusted educational channels. No distractions, just learning.
          </p>
          <div className="flex gap-4">
            <Link to="/search?q=vivek maths" className="px-6 py-2.5 bg-[#EAEAEA] text-[#0F0F10] rounded-xl font-medium hover:bg-[#EAEAEA]/90 transition-colors">
              Start Learning
            </Link>
            <Link to="/search?q=12th maths" className="px-6 py-2.5 bg-transparent border border-[#2E3035] text-[#EAEAEA] rounded-xl hover:bg-[#2A2B2F] transition-colors">
              Browse 12th Maths
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#EAEAEA]">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['12th Maths', 'Vivek Maths', 'Ram Maths', 'Exam Prep', 'Centum Tips', '10th Maths'].map((cat) => (
            <Link
              key={cat}
              to={`/search?q=${cat.toLowerCase()}`}
              className="bg-[#1F2023] border border-[#2E3035] rounded-xl p-4 text-center hover:bg-[#2A2B2F] transition-colors"
            >
              <span className="text-sm text-[#EAEAEA]">{cat}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;