import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaBook, FaGraduationCap, FaChartLine } from 'react-icons/fa';
import Button from '../components/Button';

const Home = () => {
  const categories = [
    { name: '12th Maths', icon: FaChartLine, query: '12th maths', color: '#C47A4A' },
    { name: 'Vivek Maths', icon: FaBook, query: 'vivek maths', color: '#C47A4A' },
    { name: 'Ram Maths', icon: FaGraduationCap, query: 'ram maths', color: '#C47A4A' },
    { name: 'Exam Prep', icon: FaPlay, query: 'public exam 2026', color: '#C47A4A' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#C47A4A]">Master</span> Mathematics & Science
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl">
            Join thousands of students preparing for board exams with curated content 
            from India's best educational channels. Free, forever.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/search?q=vivek maths">
              <Button size="lg">Start Learning</Button>
            </Link>
            <Link to="/search?q=12th maths">
              <Button variant="secondary" size="lg">Browse 12th Maths</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/search?q=${cat.query}`}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center
                         hover:border-[#C47A4A] hover:shadow-md transition-all
                         hover:-translate-y-1"
              >
                <Icon className="text-3xl text-[#C47A4A] mx-auto mb-3" />
                <span className="font-medium text-gray-900">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-[#C47A4A]">500+</div>
            <div className="text-sm text-gray-600 mt-1">Videos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C47A4A]">8</div>
            <div className="text-sm text-gray-600 mt-1">Channels</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C47A4A]">10K+</div>
            <div className="text-sm text-gray-600 mt-1">Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C47A4A]">Free</div>
            <div className="text-sm text-gray-600 mt-1">Forever</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Curated Content</h3>
          <p className="text-gray-600">Hand-picked videos from trusted educational channels</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">No Distractions</h3>
          <p className="text-gray-600">Clean interface focused on learning</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Always Free</h3>
          <p className="text-gray-600">No subscriptions, no hidden costs</p>
        </div>
      </section>
    </div>
  );
};

export default Home;