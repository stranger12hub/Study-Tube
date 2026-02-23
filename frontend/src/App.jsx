import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Watch from './pages/Watch';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimatedPage from './components/AnimatedPage';

function AppContent() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        <Route path="/" element={<Layout />}>
          <Route index element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="search" element={<AnimatedPage><Search /></AnimatedPage>} />
          <Route path="watch/:videoId" element={<AnimatedPage><Watch /></AnimatedPage>} />
          <Route path="history" element={<AnimatedPage><History /></AnimatedPage>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;