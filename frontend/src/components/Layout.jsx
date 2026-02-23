import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaHistory, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSidebarOpen(false);
    }
  };

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/search', icon: FaSearch, label: 'Search' },
    { path: '/history', icon: FaHistory, label: 'History' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Mobile overlay with fade animation */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 lg:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-all duration-300 ease-out
        w-64 bg-[#141414] border-r border-[#2a2a2a] z-30 flex flex-col
      `}>
        {/* Logo with hover effect */}
        <div className="p-6 border-b border-[#2a2a2a]">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center
                          group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
              StudyTube
            </span>
          </Link>
        </div>

        {/* Navigation with animated items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-300 ease-out
                  ${active 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                    : 'text-secondary hover:bg-[#1f1f1f] hover:text-white hover:border-l-2 hover:border-primary'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={`text-lg transition-transform duration-300 group-hover:scale-110 ${active ? 'text-primary' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile with hover effect */}
        <div className="p-4 border-t border-[#2a2a2a]">
          <Link 
            to="/login" 
            className="flex items-center space-x-3 p-2 rounded-lg
                     hover:bg-[#1f1f1f] transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center
                          group-hover:scale-110 transition-transform duration-300">
              <FaUser className="text-primary text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Guest</p>
              <p className="text-xs text-secondary group-hover:text-primary transition-colors duration-300">
                Sign in
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Navbar with scroll effect */}
        <header className={`
          navbar sticky top-0 z-10 transition-all duration-300
          ${isScrolled 
            ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#2a2a2a]' 
            : 'bg-transparent border-b border-transparent'
          }
        `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              {/* Mobile menu button with animations */}
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-[#1a1a1a] text-secondary
                         hover:bg-primary hover:text-white hover:scale-105 
                         active:scale-95 transition-all duration-300"
                aria-label="Open menu"
              >
                <FaBars size={18} />
              </button>
              
              {/* Search form with enhanced input */}
              <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search educational videos..."
                    className="search-input w-full px-5 py-2.5 bg-[#1a1a1a] 
                             border border-[#2a2a2a] rounded-lg
                             text-white placeholder-secondary/50
                             focus:outline-none focus:ring-2 focus:ring-primary/50
                             focus:border-primary focus:scale-[1.02]
                             transition-all duration-300"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2
                             px-5 py-1.5 bg-primary text-white rounded-md text-sm
                             hover:bg-primary-hover hover:scale-105 active:scale-95
                             transition-all duration-300"
                  >
                    <FaSearch className="inline mr-1" size={14} /> Search
                  </button>
                  
                  {/* Subtle glow effect on focus */}
                  <div className="absolute inset-0 -z-10 rounded-lg opacity-0 
                                focus-within:opacity-100 transition-opacity duration-300
                                shadow-glow"></div>
                </div>
              </form>

              {/* Sign in button with animations */}
              <Link 
                to="/login" 
                className="hidden md:block px-5 py-2 rounded-lg
                         bg-primary text-white font-medium
                         hover:bg-primary-hover hover:scale-105 active:scale-95
                         transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content with fade animation */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;