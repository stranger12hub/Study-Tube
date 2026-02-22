import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaSearch, 
  FaHistory, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaGraduationCap,
  FaChartLine,
  FaBook,
  FaStar,
  FaYoutube
} from 'react-icons/fa';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/search', icon: FaSearch, label: 'Search' },
    { path: '/history', icon: FaHistory, label: 'History' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  const categories = [
    { name: '12th Maths', icon: FaChartLine, query: '12th maths' },
    { name: 'Vivek Maths', icon: FaBook, query: 'vivek maths' },
    { name: 'Ram Maths', icon: FaGraduationCap, query: 'ram maths' },
    { name: 'Exam Prep', icon: FaStar, query: 'public exam 2026' },
    { name: 'Centum Tips', icon: FaStar, query: 'centum' },
    { name: '10th Maths', icon: FaChartLine, query: '10th maths' },
  ];

  return (
    <div className="flex h-screen bg-primary-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-primary-bg/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-72 glass border-r border-white/5 z-30 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-glow">
              <FaYoutube className="text-primary-bg text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-accent-light">Study</span>
                <span className="text-accent">Tube</span>
              </h1>
              <p className="text-xs text-accent-light/50">Curated Learning</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Categories */}
          <div className="pt-6 mt-6 border-t border-white/5">
            <h3 className="px-4 text-xs font-semibold text-accent-light/50 uppercase tracking-wider mb-3">
              Recommended
            </h3>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/search?q=${cat.query}`}
                  className="sidebar-link"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="text-lg text-accent/70" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 bg-card rounded-xl border border-white/5">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <FaUser className="text-accent-light" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-accent-light">Guest User</p>
              <Link to="/login" className="text-xs text-accent hover:text-accent-light transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="glass border-b border-white/5 px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden btn-icon p-2"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search educational videos..."
                  className="search-bar pr-12"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 
                           p-2 btn-primary py-1.5 px-4 text-sm"
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            <Link 
              to="/login" 
              className="hidden md:block btn-primary"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;