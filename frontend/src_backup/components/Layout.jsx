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
import SearchHistory from './SearchHistory';
import PomodoroTimer from './PomodoroTimer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Save to search history
      const history = JSON.parse(localStorage.getItem('studytube-search-history') || '[]');
      const newHistory = [
        {
          query: searchQuery.trim(),
          timestamp: new Date().toISOString()
        },
        ...history.filter(item => item.query !== searchQuery.trim())
      ].slice(0, 10);
      localStorage.setItem('studytube-search-history', JSON.stringify(newHistory));
      
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowHistory(false);
    }
  };

  const handleSearchSelect = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setShowHistory(false);
  };

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/search', icon: FaSearch, label: 'Search' },
    { path: '/history', icon: FaHistory, label: 'History' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  const categories = [
    { name: '12th Maths', icon: FaChartLine, color: 'text-green-400', query: '12th maths' },
    { name: 'Vivek Maths', icon: FaBook, color: 'text-blue-400', query: 'vivek maths' },
    { name: 'Ram Maths', icon: FaGraduationCap, color: 'text-purple-400', query: 'ram maths' },
    { name: 'Exam Prep', icon: FaStar, color: 'text-yellow-400', query: 'public exam 2026' },
    { name: 'Centum Tips', icon: FaStar, color: 'text-pink-400', query: 'centum' },
    { name: '10th Maths', icon: FaChartLine, color: 'text-orange-400', query: '10th maths' },
  ];

  return (
    <div className="flex h-screen bg-dark-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-72 glass-effect z-30 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-dark-800">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center">
              <FaYoutube className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-gradient">Study</span>
                <span className="text-white">Tube</span>
              </h1>
              <p className="text-xs text-gray-500">Curated Learning</p>
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
                <Icon className={`text-xl ${isActive ? 'text-accent-blue' : ''}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Categories Section */}
          <div className="pt-6 mt-6 border-t border-dark-800">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Recommended Searches
            </h3>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/search?q=${cat.query}`}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-300"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`text-lg ${cat.color}`} />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-dark-800">
          <div className="flex items-center space-x-3 p-2 bg-dark-800/50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-full flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Guest User</p>
              <Link to="/login" className="text-xs text-accent-blue hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="glass-effect border-b border-dark-800 px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative" style={{ zIndex: 1000 }}>
  <div className="relative group" style={{ zIndex: 1001 }}>
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setShowHistory(true);
      }}
      onFocus={() => setShowHistory(true)}
      onBlur={() => {
        setTimeout(() => setShowHistory(false), 200);
      }}
      placeholder="Try: vivek maths, 12th maths, ram maths, public exam 2026..."
      className="w-full px-5 py-3 bg-dark-800/50 border border-dark-700 rounded-xl 
               focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue
               transition-all duration-300 text-gray-200 placeholder-gray-500
               group-hover:border-dark-600 pr-24"
      style={{ position: 'relative', zIndex: 1002 }}
    />
    
    {/* Search History Dropdown */}
    {showHistory && (
      <SearchHistory 
        query={searchQuery}
        onSelect={(query) => {
          setSearchQuery(query);
          setShowHistory(false);
          navigate(`/search?q=${encodeURIComponent(query)}`);
        }}
        onSearch={() => {
          if (searchQuery.trim()) {
            setShowHistory(false);
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
          }
        }}
      />
    )}
    
    <button 
      type="submit"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 
               p-2 bg-gradient-to-r from-accent-blue to-accent-purple 
               rounded-lg text-white hover:shadow-lg hover:shadow-accent-blue/30
               transition-all duration-300"
      style={{ zIndex: 1003 }}
    >
      <FaSearch />
    </button>
  </div>
</form>

            <Link 
              to="/login" 
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-accent-blue to-accent-purple 
                       text-white rounded-lg hover:shadow-lg hover:shadow-accent-blue/30 
                       transition-all duration-300 font-medium"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        
        {/* Pomodoro Timer - Floating widget */}
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default Layout;