import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="hero-section section">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Learn with 
          <span className="block text-text-secondary mt-1">
            curated educational content
          </span>
        </h1>
        
        <p className="text-text-secondary text-lg mb-6 max-w-2xl">
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

        {/* Stats */}
        <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border">
          <div>
            <div className="text-2xl font-bold text-text-primary">500+</div>
            <div className="text-sm text-text-secondary">Videos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">8</div>
            <div className="text-sm text-text-secondary">Channels</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">Free</div>
            <div className="text-sm text-text-secondary">Forever</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;