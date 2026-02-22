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

  // Fixed categories - only 6 items
  const categories = [
    { name: '12th Maths', icon: FaChartLine, color: 'text-ash', query: '12th maths' },
    { name: 'Vivek Maths', icon: FaBook, color: 'text-ash', query: 'vivek maths' },
    { name: 'Ram Maths', icon: FaGraduationCap, color: 'text-ash', query: 'ram maths' },
    { name: 'Exam Prep', icon: FaStar, color: 'text-ash', query: 'public exam 2026' },
    { name: 'Centum Tips', icon: FaStar, color: 'text-ash', query: 'centum' },
    { name: '10th Maths', icon: FaChartLine, color: 'text-ash', query: '10th maths' },
  ];

  return (
    <div className="flex h-screen bg-black">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-72 bg-ash border-r border-ash-light z-30 flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-ash-light">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ash-light rounded-xl flex items-center justify-center">
              <FaYoutube className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-white">Study</span>
                <span className="text-ash-light">Tube</span>
              </h1>
              <p className="text-xs text-ash">Curated Learning</p>
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'bg-ash-light text-white' 
                    : 'text-ash hover:bg-ash-light hover:text-white'}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="text-xl" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Categories Section */}
          <div className="pt-6 mt-6 border-t border-ash-light">
            <h3 className="px-4 text-xs font-semibold text-ash uppercase tracking-wider mb-3">
              Recommended Searches
            </h3>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/search?q=${cat.query}`}
                  className="flex items-center space-x-3 px-4 py-2 text-ash hover:text-white hover:bg-ash-light rounded-lg transition-all duration-300"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="text-lg" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-ash-light">
          <div className="flex items-center space-x-3 p-2 bg-ash-light/30 rounded-lg">
            <div className="w-10 h-10 bg-ash-light rounded-full flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Guest User</p>
              <Link to="/login" className="text-xs text-ash hover:text-white">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-black">
        {/* Header */}
        <header className="bg-ash border-b border-ash-light px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-ash hover:text-white transition-colors"
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
      className="w-full px-5 py-3 bg-black border border-ash-light rounded-xl 
               focus:outline-none focus:ring-2 focus:ring-ash focus:border-ash-light
               transition-all duration-300 text-white placeholder-ash"
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
               p-2 bg-ash-light text-white rounded-lg hover:bg-ash hover:shadow-lg
               transition-all duration-300"
      style={{ zIndex: 1003 }}
    >
      <FaSearch />
    </button>
  </div>
</form>

            <Link 
              to="/login" 
              className="hidden md:block px-6 py-2 bg-ash-light text-white rounded-lg hover:bg-ash transition-all duration-300 font-medium"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          <Outlet />
        </main>
        
        {/* Pomodoro Timer - Floating widget */}
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default Layout;