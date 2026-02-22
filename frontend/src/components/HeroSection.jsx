import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="relative z-10 max-w-2xl">
        <h1 className="hero-title">
          Learn with curated educational content
        </h1>
        
        <p className="hero-subtitle">
          Access hand-picked videos from trusted educational channels. 
          No distractions, just learning.
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