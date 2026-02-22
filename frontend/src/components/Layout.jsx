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
    // ROOT LAYOUT - Full height with flex
    <div className="flex min-h-screen bg-[#0F0F10] text-[#EAEAEA] font-sans antialiased">
      
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Fixed width 240px */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-[240px] bg-[#17181A] border-r border-[#2E3035] z-30 flex flex-col
        overflow-y-auto
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-[#2E3035]">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1F2023] rounded-xl flex items-center justify-center border border-[#2E3035]">
              <FaYoutube className="text-[#EAEAEA] text-lg" />
            </div>
            <span className="text-lg font-semibold">
              <span className="text-[#EAEAEA]">Study</span>
              <span className="text-[#A1A1AA]">Tube</span>
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-[#2A2B2F] text-[#EAEAEA]' 
                    : 'text-[#A1A1AA] hover:bg-[#2A2B2F] hover:text-[#EAEAEA]'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="text-lg" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Categories Section */}
          <div className="pt-5 mt-5 border-t border-[#2E3035]">
            <h3 className="px-3 text-xs font-medium text-[#A1A1AA] uppercase tracking-wider mb-2">
              Recommended
            </h3>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/search?q=${cat.query}`}
                  className="flex items-center gap-3 px-3 py-2 text-[#A1A1AA] hover:bg-[#2A2B2F] hover:text-[#EAEAEA] rounded-xl transition-all text-sm"
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
        <div className="p-3 border-t border-[#2E3035]">
          <div className="flex items-center gap-3 p-2 bg-[#1F2023] rounded-xl border border-[#2E3035]">
            <div className="w-9 h-9 bg-[#2A2B2F] rounded-full flex items-center justify-center">
              <FaUser className="text-[#A1A1AA] text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#EAEAEA]">Guest</p>
              <Link to="/login" className="text-xs text-[#A1A1AA] hover:text-[#EAEAEA] transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - flex-1 */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* HEADER - Inside main, before centered wrapper */}
        <header className="bg-[#17181A] border-b border-[#2E3035] px-8 py-3">
          <div className="max-w-[1200px] mx-auto flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-10 h-10 bg-[#1F2023] border border-[#2E3035] rounded-xl flex items-center justify-center text-[#A1A1AA] hover:text-[#EAEAEA] transition-colors"
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
                  className="w-full h-11 bg-[#17181A] border border-[#2E3035] rounded-xl px-5 pr-24
                           text-[#EAEAEA] text-sm placeholder-[#A1A1AA]/50
                           focus:outline-none focus:border-[#A1A1AA] transition-colors"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 
                           px-4 py-1.5 bg-[#EAEAEA] text-[#0F0F10] rounded-lg text-sm font-medium
                           hover:bg-[#EAEAEA]/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Desktop sign in */}
            <Link 
              to="/login" 
              className="hidden md:block px-4 py-2 bg-transparent border border-[#2E3035] 
                       text-[#EAEAEA] text-sm rounded-xl hover:bg-[#2A2B2F] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* CENTERED CONTENT WRAPPER - This is the critical part */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto px-8 py-8 w-full">
            {/* Page content goes here */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;