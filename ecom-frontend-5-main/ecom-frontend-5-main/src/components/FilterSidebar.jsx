import React, { useState } from 'react';
import { CATEGORIES } from '../config/constants';
import '../styles/FilterSidebar.css';

const FilterSidebar = ({ onFilterChange, filters }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState(filters.maxPrice || 10000);

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(value);
    onFilterChange({ ...filters, maxPrice: value });
  };

  const handleAvailabilityChange = (e) => {
    onFilterChange({ ...filters, inStockOnly: e.target.checked });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sortBy: e.target.value });
  };

  const clearFilters = () => {
    setPriceRange(10000);
    onFilterChange({ 
      category: '', 
      maxPrice: 10000, 
      inStockOnly: false, 
      sortBy: '' 
    });
  };

  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`bi bi-${isOpen ? 'chevron-left' : 'chevron-right'}`}></i>
      </button>

      <div className="filter-content">
        <div className="filter-header">
          <h3>
            <i className="bi bi-funnel"></i>
            Filters
          </h3>
          <button className="btn-clear-filters" onClick={clearFilters}>
            <i className="bi bi-x-circle"></i>
            Clear All
          </button>
        </div>

        {/* Sort By */}
        <div className="filter-section">
          <h4>Sort By</h4>
          <select 
            className="filter-select"
            value={filters.sortBy || ''}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="stock-desc">Stock: High to Low</option>
          </select>
        </div>

        {/* Categories */}
        <div className="filter-section">
          <h4>Categories</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === ''}
                onChange={() => handleCategoryChange('')}
              />
              <span>All Categories</span>
            </label>
            {CATEGORIES.map((category) => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="price-slider-container">
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange}
              onChange={handlePriceChange}
              className="price-slider"
            />
            <div className="price-labels">
              <span>$0</span>
              <span className="current-price">${priceRange}</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="filter-section">
          <h4>Availability</h4>
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.inStockOnly || false}
              onChange={handleAvailabilityChange}
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
