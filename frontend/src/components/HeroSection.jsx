import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="rounded-2xl p-8"
             style={{ backgroundColor: '#0B2B26', border: '1px solid #163832' }}>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-3" style={{ color: '#DAF1DE' }}>
          Learn with curated educational content
        </h1>
        
        <p className="mb-6" style={{ color: '#8EB69B' }}>
          Access hand-picked videos from trusted educational channels. 
          No distractions, just learning.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link 
            to="/search?q=vivek maths" 
            className="px-6 py-2.5 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: '#8EB69B',
              color: '#051F20'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#235347';
              e.currentTarget.style.color = '#DAF1DE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#8EB69B';
              e.currentTarget.style.color = '#051F20';
            }}>
            Start Learning
          </Link>
          <Link 
            to="/search?q=12th maths" 
            className="px-6 py-2.5 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #8EB69B',
              color: '#8EB69B'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#163832';
              e.currentTarget.style.color = '#DAF1DE';
              e.currentTarget.style.borderColor = '#DAF1DE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#8EB69B';
              e.currentTarget.style.borderColor = '#8EB69B';
            }}>
            Browse 12th Maths
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;