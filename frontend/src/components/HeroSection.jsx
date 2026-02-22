import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-text-primary mb-3">
          Learn with curated educational content
        </h1>
        
        <p className="text-text-secondary mb-6">
          Access hand-picked videos from trusted educational channels. 
          No distractions, just learning.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link to="/search?q=vivek maths" className="btn-primary">
            Start Learning
          </Link>
          <Link to="/search?q=12th maths" className="btn-secondary">
            Browse 12th Maths
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;