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
    <div className="layout-container">
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
        sidebar z-30
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center border border-border">
              <FaYoutube className="text-text-primary text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-text-primary">Study</span>
                <span className="text-text-secondary">Tube</span>
              </h1>
              <p className="text-xs text-text-secondary">Curated Learning</p>
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
          <div className="pt-6 mt-6 border-t border-border">
            <h3 className="px-4 text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
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
                  <Icon className="text-lg text-text-secondary" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-2 bg-card rounded-xl border border-border">
            <div className="w-10 h-10 bg-card-hover rounded-full flex items-center justify-center">
              <FaUser className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Guest User</p>
              <Link to="/login" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <header className="bg-primary-secondary border-b border-border px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden btn-icon"
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
                           btn-primary py-1.5 px-4 text-sm"
                >
                  <FaSearch className="text-primary-bg" />
                </button>
              </div>
            </form>

            <Link 
              to="/login" 
              className="hidden md:block btn-secondary text-sm"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="content-wrapper">
          <div className="content-center animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;