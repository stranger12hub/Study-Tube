<form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
  <div className="relative group">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setShowHistory(true);
      }}
      onFocus={() => setShowHistory(true)}
      placeholder="Try: vivek maths, 12th maths, ram maths, public exam 2026..."
      className="w-full px-5 py-3 bg-dark-800/50 border border-dark-700 rounded-xl 
               focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue
               transition-all duration-300 text-gray-200 placeholder-gray-500
               group-hover:border-dark-600 pr-24"
    />
    
    {/* Search History Dropdown */}
    <SearchHistory 
      query={searchQuery}
      onSelect={(query) => {
        setSearchQuery(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }}
      onSearch={() => {
        if (searchQuery.trim()) {
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
      }}
      visible={showHistory}
      onClose={() => setShowHistory(false)}
    />
    
    <button 
      type="submit"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 
               p-2 bg-gradient-to-r from-accent-blue to-accent-purple 
               rounded-lg text-white hover:shadow-lg hover:shadow-accent-blue/30
               transition-all duration-300"
    >
      <FaSearch />
    </button>
  </div>
</form>