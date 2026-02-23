import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaHistory, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white border-r border-gray-200 z-30 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#C47A4A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">StudyTube</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                  ${active 
                    ? 'bg-[#FEF6F0] text-[#C47A4A]' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-200">
          <Link to="/login" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-600 text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Guest</p>
              <p className="text-xs text-gray-500">Sign in</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <FaBars className="text-gray-600" />
              </button>
              
              <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search videos..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-[#C47A4A] focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2
                             px-4 py-1 bg-[#C47A4A] text-white rounded-md text-sm
                             hover:bg-[#b06a3d] transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              <Link to="/login" className="hidden md:block px-4 py-2 border-2 border-[#C47A4A] text-[#C47A4A] rounded-lg hover:bg-[#FEF6F0] transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;