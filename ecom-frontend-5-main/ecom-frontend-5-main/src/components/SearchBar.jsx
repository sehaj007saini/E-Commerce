import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-input-wrapper">
        <i className="bi bi-search search-icon"></i>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        )}
      </div>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
