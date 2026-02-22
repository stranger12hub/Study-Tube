import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/HomeWarm';
import Search from './pages/SearchWarm';
import Watch from './pages/Watch';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import LoadingScreen from './components/LoadingScreen';

// Black and Ash Theme - Inline Styles
const style = document.createElement('style');
style.textContent = `
  /* Base styles */
  body {
    background-color: #0a0a0a !important;
    color: #e0e0e0 !important;
    margin: 0 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Arial', sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Black & Ash Theme Colors */
  .bg-black {
    background-color: #0a0a0a !important;
  }
  .bg-ash {
    background-color: #1a1a1a !important;
  }
  .bg-ash-light {
    background-color: #2a2a2a !important;
  }
  .bg-ash-lighter {
    background-color: #3a3a3a !important;
  }
  
  /* Text Colors */
  .text-ash {
    color: #a0a0a0 !important;
  }
  .text-ash-light {
    color: #c0c0c0 !important;
  }
  .text-white {
    color: #ffffff !important;
  }
  .text-black {
    color: #0a0a0a !important;
  }
  
  /* Border Colors */
  .border-ash {
    border-color: #2a2a2a !important;
  }
  .border-ash-light {
    border-color: #3a3a3a !important;
  }
  
  /* Hover Effects */
  .hover\\:bg-ash:hover {
    background-color: #2a2a2a !important;
  }
  .hover\\:bg-ash-light:hover {
    background-color: #3a3a3a !important;
  }
  .hover\\:text-ash:hover {
    color: #a0a0a0 !important;
  }
  .hover\\:text-white:hover {
    color: #ffffff !important;
  }
  .hover\\:border-ash:hover {
    border-color: #3a3a3a !important;
  }
  
  /* Card Styles */
  .card-ash {
    background-color: #1a1a1a !important;
    border: 1px solid #2a2a2a !important;
    border-radius: 0.75rem !important;
    transition: all 0.3s ease !important;
  }
  .card-ash:hover {
    background-color: #2a2a2a !important;
    border-color: #3a3a3a !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
  }
  
  /* Button Styles */
  .btn-ash {
    background-color: #2a2a2a !important;
    color: #ffffff !important;
    padding: 0.5rem 1.5rem !important;
    border-radius: 0.5rem !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
    border: 1px solid #3a3a3a !important;
  }
  .btn-ash:hover {
    background-color: #3a3a3a !important;
    transform: scale(1.05) !important;
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5) !important;
  }
  
  /* Glass Effect */
  .glass-ash {
    background: rgba(26, 26, 26, 0.8) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid #2a2a2a !important;
  }
  
  /* Divider */
  .divider-ash {
    height: 1px !important;
    background: linear-gradient(to right, transparent, #2a2a2a, transparent) !important;
    margin: 2rem 0 !important;
  }
  
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px !important;
    height: 8px !important;
  }
  ::-webkit-scrollbar-track {
    background: #1a1a1a !important;
  }
  ::-webkit-scrollbar-thumb {
    background: #3a3a3a !important;
    border-radius: 4px !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #4a4a4a !important;
  }
  
  /* Loading Animation */
  @keyframes pulse-ash {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  .animate-pulse-ash {
    animation: pulse-ash 2s cubic-bezier(0.4, 0, 0.6, 1) infinite !important;
  }
`;
document.head.appendChild(style);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="watch/:videoId" element={<Watch />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;