import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

interface DropdownOption {
  label: string;
  value: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dropdownOptions: DropdownOption[] = [
    { label: "All Categories", value: "" },
    { label: "Laptops", value: "Laptops" },
    { label: "Desktop/PC", value: "Desktop/PCs" },
    { label: "Components", value: "Components" },
    { label: "Accessories", value: "Accessories" },
    { label: "Speakers", value: "Speakers" },
  ];

  const handleCategorySelect = (option: DropdownOption) => {
    setSelectedCategory(option.label);
    setIsDropdownOpen(false);
    
    // Navigate to products page with category filter
    if (option.value) {
      navigate(`/products?category=${option.value}`);
    } else {
      navigate('/products');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50 text-sm">
      {/* Top Bar - Logo and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="PC Concept Logo"
                className="w-[200px] h-auto object-contain cursor-pointer transition-opacity duration-200 hover:opacity-80"
              />
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-0 flex-1 max-w-2xl">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 border border-r-0 border-gray-300 rounded-l-md flex items-center gap-2 min-w-[160px] justify-between bg-white text-gray-700 hover:bg-gray-50"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full border rounded shadow-lg z-50 bg-white border-gray-300">
                  {dropdownOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategorySelect(option)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none bg-white text-gray-700"
            />

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="px-6 py-2 border border-l-0 border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
            >
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3">
            {[
              { path: "/", label: "HOME" },
              { path: "/products", label: "PRODUCTS" },
              { path: "/blog", label: "BLOG" },
              { path: "/reviews", label: "REVIEWS" },
              { path: "/about", label: "ABOUT" },
              { path: "/contact", label: "CONTACT" },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-all duration-200 ${
                      isActive ? "text-red-700" : "text-gray-700"
                    } hover:text-red-700`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
