import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaBook, FaGraduationCap, FaChartLine, FaArrowRight } from 'react-icons/fa';
import Button from '../components/Button';

const Home = () => {
  const categories = [
    { name: '12th Maths', icon: FaChartLine, query: '12th maths' },
    { name: 'Vivek Maths', icon: FaBook, query: 'vivek maths' },
    { name: 'Ram Maths', icon: FaGraduationCap, query: 'ram maths' },
    { name: 'Exam Prep', icon: FaPlay, query: 'public exam 2026' },
  ];

  const features = [
    {
      title: 'Curated Content',
      description: 'Hand-picked videos from trusted educational channels'
    },
    {
      title: 'No Distractions',
      description: 'Clean interface focused on learning'
    },
    {
      title: 'Always Free',
      description: 'No subscriptions, no hidden costs'
    }
  ];

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section with Animations */}
      <section className="relative bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"></div>
        
        <div className="relative p-8 md:p-12 z-10">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="text-primary">Master</span> Mathematics & Science
          </h1>
          
          <p className="hero-paragraph text-lg text-secondary mb-8 max-w-2xl leading-relaxed">
            Join thousands of students preparing for board exams with curated content 
            from India's best educational channels. Free, forever.
          </p>
          
          <div className="hero-buttons flex flex-wrap gap-4">
            <Link to="/search?q=vivek maths">
              <Button size="lg" className="group">
                Start Learning 
                <FaArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/search?q=12th maths">
              <Button variant="secondary" size="lg">
                Browse 12th Maths
              </Button>
            </Link>
          </div>

          {/* Stats with animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#2a2a2a]">
            {[
              { value: '500+', label: 'Videos' },
              { value: '8', label: 'Channels' },
              { value: '10K+', label: 'Students' },
              { value: 'Free', label: 'Forever' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="animate-slideUp">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Browse Categories</h2>
          <Link 
            to="/search" 
            className="text-primary hover:text-primary/80 transition-colors duration-300 flex items-center gap-2"
          >
            View All <FaArrowRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/search?q=${cat.query}`}
                className="category-card group bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center
                         hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="text-3xl text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-white group-hover:text-primary transition-colors duration-300">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6 animate-slideUp" style={{ animationDelay: '200ms' }}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 text-center
                     hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="font-semibold text-xl text-white mb-3">{feature.title}</h3>
            <p className="text-secondary leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-r from-[#141414] to-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-12 text-center overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of students who are already acing their exams with StudyTube
        </p>
        <Link to="/search?q=vivek maths">
          <Button size="lg" className="group">
            Get Started Now
            <FaArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;