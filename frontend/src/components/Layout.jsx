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
    <div className="flex min-h-screen" style={{ backgroundColor: '#051F20' }}>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 lg:hidden"
          style={{ backgroundColor: '#051F20', opacity: 0.8 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-[240px] z-30 flex flex-col overflow-y-auto
      `} style={{ backgroundColor: '#0B2B26', borderRight: '1px solid #163832' }}>
        
        {/* Logo */}
        <div className="p-5" style={{ borderBottom: '1px solid #163832' }}>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" 
                 style={{ backgroundColor: '#163832', border: '1px solid #235347' }}>
              <FaYoutube style={{ color: '#DAF1DE' }} className="text-lg" />
            </div>
            <span className="text-lg font-semibold">
              <span style={{ color: '#DAF1DE' }}>Study</span>
              <span style={{ color: '#8EB69B' }}>Tube</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                style={{
                  backgroundColor: isActive ? '#235347' : 'transparent',
                  color: isActive ? '#DAF1DE' : '#8EB69B'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#235347';
                    e.currentTarget.style.color = '#DAF1DE';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#8EB69B';
                  }
                }}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="text-lg" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Categories */}
          <div className="pt-5 mt-5" style={{ borderTop: '1px solid #163832' }}>
            <h3 className="px-3 text-xs font-medium uppercase tracking-wider mb-2"
                style={{ color: '#8EB69B' }}>
              Recommended
            </h3>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/search?q=${cat.query}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-sm"
                  style={{ color: '#8EB69B' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#235347';
                    e.currentTarget.style.color = '#DAF1DE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#8EB69B';
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="text-base" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-3" style={{ borderTop: '1px solid #163832' }}>
          <div className="flex items-center gap-3 p-2 rounded-xl"
               style={{ backgroundColor: '#163832', border: '1px solid #235347' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: '#235347' }}>
              <FaUser style={{ color: '#8EB69B' }} className="text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: '#DAF1DE' }}>Guest</p>
              <Link to="/login" className="text-xs transition-colors"
                    style={{ color: '#8EB69B' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#DAF1DE'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#8EB69B'}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Header */}
        <header className="px-8 py-3" style={{ backgroundColor: '#0B2B26', borderBottom: '1px solid #163832' }}>
          <div className="max-w-[1200px] mx-auto flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ backgroundColor: '#163832', border: '1px solid #235347', color: '#8EB69B' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#235347';
                e.currentTarget.style.color = '#DAF1DE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#163832';
                e.currentTarget.style.color = '#8EB69B';
              }}
            >
              {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search educational videos..."
                  className="w-full h-11 rounded-xl px-5 pr-24 text-sm transition-colors"
                  style={{
                    backgroundColor: '#163832',
                    border: '1px solid #235347',
                    color: '#DAF1DE'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#8EB69B'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#235347'}
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 
                           px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
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
                  }}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Desktop sign in */}
            <Link 
              to="/login" 
              className="hidden md:block px-4 py-2 rounded-xl text-sm transition-colors"
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
              }}
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto px-8 py-8 w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;