import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="relative z-10 max-w-2xl">
        <h1 className="hero-title">
          <span className="hero-title-highlight">Master</span> Mathematics & Science
        </h1>
        
        <p className="hero-subtitle">
          Join thousands of students preparing for board exams with curated content 
          from India's best educational channels. Free, forever.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link 
            to="/search?q=vivek maths" 
            className="btn-primary"
          >
            Start Learning
          </Link>
          <Link 
            to="/search?q=12th maths" 
            className="btn-secondary"
          >
            Browse 12th Maths
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;