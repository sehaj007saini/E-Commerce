import React, { useEffect, useState, useContext } from "react";
import axios from "../axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import { useAuth } from "../Context/AuthContext";

const Navbar = ({ onSelectCategory }) => {
  const { cart, wishlist } = useContext(AppContext);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-bag-heart-fill me-2" style={{ color: '#818cf8' }}></i>
              E-Commerce Platform
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} 
                    to="/"
                    onClick={() => {
                      setSelectedCategory("");
                      onSelectCategory("");
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/orders">
                    <i className="bi bi-truck me-1"></i> My Orders
                  </NavLink>
                </li>

                {isAdmin && (
                  <>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/admin/dashboard">
                        <i className="bi bi-speedometer2 me-1"></i> Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/add_product">
                        Add Product
                      </NavLink>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/wishlist">
                    Wishlist
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link p-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories {selectedCategory && `(${selectedCategory})`}
                  </button>

                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className={`dropdown-item ${!selectedCategory ? 'active' : ''}`}
                        onClick={() => handleCategorySelect("")}
                      >
                        <i className="bi bi-grid-3x3-gap me-2"></i>
                        All Categories
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <div className="nav-actions">
                <div className="search-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {showSearchResults && (
                    <ul className="search-results">
                      {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                          <li key={result.id}>
                            <Link to={`/product/${result.id}`} className="search-result-link">
                              <span>{result.name}</span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        noResults && (
                          <li className="no-results-message">No products found</li>
                        )
                      )}
                    </ul>
                  )}
                </div>

                <Link to="/wishlist" className="cart-link">
                  <span className="bi bi-heart"></span>
                  Wishlist
                  {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
                </Link>
                
                <Link to="/cart" className="cart-link">
                  <span className="bi bi-cart"></span>
                  Cart
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>

                {user || isAdmin ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: isAdmin ? '#7c3aed' : '#2563eb', background: isAdmin ? '#f3e8ff' : '#eff6ff', padding: '4px 10px', borderRadius: '14px' }}>
                      <i className={`bi ${isAdmin ? 'bi-shield-check' : 'bi-person-circle'} me-1`}></i>
                      {user?.username || (isAdmin ? 'Admin' : 'User')}
                    </span>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i>
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
                    <Link to="/login" className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
                    </Link>
                    <Link to="/register" className="btn btn-sm btn-primary" style={{ background: '#4f46e5', border: 'none' }}>
                      <i className="bi bi-person-plus me-1"></i> Register
                    </Link>
                  </div>
                )}

                <button className="theme-btn" onClick={toggleTheme}>
                  {theme === "dark-theme" ? (
                    <i className="bi bi-moon-fill"></i>
                  ) : (
                    <i className="bi bi-sun-fill"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
