import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { 
  FaGraduationCap, 
  FaChartLine, 
  FaBook,
  FaYoutube,
  FaStar,
  FaUsers,
  FaInfinity,
  FaCalculator,
  FaAtom
} from 'react-icons/fa';

const Home = () => {
  // Updated categories to match available content
  const categories = [
    { 
      icon: FaChartLine, 
      name: '12th Maths', 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      description: '12th standard mathematics videos',
      query: '12th maths'
    },
    { 
      icon: FaBook, 
      name: 'Vivek Maths', 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      description: 'Vivek Maths & Science channel',
      query: 'vivek maths'
    },
    { 
      icon: FaCalculator, 
      name: 'Ram Maths', 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      description: 'Ram maths educational content',
      query: 'ram maths'
    },
    { 
      icon: FaStar, 
      name: 'Exam Prep', 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400',
      description: 'Public exam 2026 preparation',
      query: 'public exam 2026'
    },
    { 
      icon: FaAtom, 
      name: 'Physics', 
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      description: '12th physics videos',
      query: '12th physics'
    },
    { 
      icon: FaGraduationCap, 
      name: 'Centum Tips', 
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10',
      textColor: 'text-indigo-400',
      description: 'How to get centum',
      query: 'centum'
    },
  ];

  const features = [
    {
      icon: FaYoutube,
      title: 'Curated Content',
      description: 'Only videos from approved educational channels',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: FaStar,
      title: 'Exam Focused',
      description: '12th standard, public exam preparation',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: FaUsers,
      title: 'Tamil Medium',
      description: 'Content in Tamil for better understanding',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: FaInfinity,
      title: 'Always Free',
      description: 'No subscriptions, no hidden costs',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const popularSearches = [
    { name: 'vivek maths', color: 'from-blue-400 to-blue-600' },
    { name: 'ram maths', color: 'from-purple-400 to-purple-600' },
    { name: '12th maths', color: 'from-green-400 to-green-600' },
    { name: 'public exam 2026', color: 'from-yellow-400 to-yellow-600' },
    { name: 'centum', color: 'from-red-400 to-red-600' },
    { name: '10th maths', color: 'from-indigo-400 to-indigo-600' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-900 to-dark-950 p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 via-accent-purple/20 to-accent-blue/20 animate-gradient"></div>
        <div className="relative glass-effect rounded-3xl p-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Tamil</span>{' '}
            <span className="text-white">Maths & Science</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Curated educational content from Vivek Maths & Science and Ram Maths channels. 
            Perfect for 12th standard and public exam preparation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/search?q=vivek maths" 
              className="btn-primary text-lg px-8 py-3"
            >
              Vivek Maths Videos
            </Link>
            <Link 
              to="/search?q=12th maths" 
              className="px-8 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-lg 
                       transition-all duration-300 border border-dark-700 hover:border-accent-blue/50"
            >
              12th Maths
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-dark-800">
            <div>
              <div className="text-3xl font-bold text-gradient">50+</div>
              <div className="text-gray-400">Educational Videos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">2</div>
              <div className="text-gray-400">Active Channels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">24/7</div>
              <div className="text-gray-400">Free Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8">
          <span className="text-gradient">Browse</span> Available Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={`/search?q=${category.query}`}
                className="group relative overflow-hidden rounded-2xl bg-dark-900 p-6 
                         hover:transform hover:scale-105 transition-all duration-500
                         border border-dark-800 hover:border-transparent"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 
                                group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center 
                                justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`text-3xl ${category.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                <div className={`text-sm ${category.textColor} font-medium`}>
                  Browse Videos →
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-900 to-dark-950 p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 via-accent-blue/20 to-accent-purple/20 animate-gradient"></div>
        <div className="relative glass-effect rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-gradient">StudyTube</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center 
                                  justify-center mx-auto mb-4 group-hover:scale-110 
                                  transition-transform duration-300`}>
                    <Icon className={`text-4xl ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div>
        <h2 className="text-3xl font-bold mb-8">
          <span className="text-gradient">Popular</span> Searches
        </h2>
        <div className="flex flex-wrap gap-4">
          {popularSearches.map((item, index) => (
            <Link
              key={index}
              to={`/search?q=${item.name}`}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${item.color} p-1`}
            >
              <div className="relative bg-dark-900 rounded-lg px-6 py-3 group-hover:bg-transparent 
                            transition-all duration-300">
                <span className="text-white font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple opacity-90"></div>
        <div className="relative p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Try searching for "vivek maths" or "12th maths" to see available videos.
          </p>
          <Link 
            to="/search?q=vivek maths" 
            className="inline-block px-8 py-3 bg-white text-accent-blue font-semibold 
                     rounded-lg hover:shadow-xl hover:shadow-white/20 transform hover:scale-105 
                     transition-all duration-300"
          >
            View Vivek Maths Videos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;