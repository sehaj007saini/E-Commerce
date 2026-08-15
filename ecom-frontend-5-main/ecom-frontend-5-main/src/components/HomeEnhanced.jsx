import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import productService from "../services/productService";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./SearchBar";
import Toast from "./Toast";
import { ProductGridSkeleton } from "./LoadingSkeleton";
import unplugged from "../assets/unplugged.png";
import "../styles/Home.css";

const HomeEnhanced = () => {
  const { data, isError, isLoading, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  
  const [filters, setFilters] = useState({
    category: '',
    maxPrice: 10000,
    inStockOnly: false,
    sortBy: ''
  });

  useEffect(() => {
    if (data && data.length > 0) {
      fetchProductImages();
    } else {
      setProducts([]);
      setFilteredProducts([]);
      setLoadingImages(false);
    }
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchTerm]);

  const fetchProductImages = async () => {
    setLoadingImages(true);
    
    const updatedProducts = await Promise.all(
      data.map(async (product) => {
        const result = await productService.getProductImage(product.id);
        return {
          ...product,
          imageUrl: result.success ? result.data : unplugged
        };
      })
    );
    
    setProducts(updatedProducts);
    setLoadingImages(false);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Price filter
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    // Stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(p => p.productAvailable && p.stockQuantity > 0);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'stock-desc':
          filtered.sort((a, b) => b.stockQuantity - a.stockQuantity);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    if (!product.productAvailable) {
      showToast("This product is currently out of stock", "error");
      return;
    }
    
    addToCart(product);
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  if (isLoading || loadingImages) {
    return (
      <div className="home-container">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <img src={unplugged} alt="Error" className="error-image" />
        <h3 className="error-title">Unable to load products</h3>
        <p className="error-message">{isError}</p>
        <button className="btn btn-primary btn-retry" onClick={refreshData}>
          <i className="bi bi-arrow-clockwise"></i>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Discover Amazing Products</h1>
        <p className="hero-subtitle">Shop the best deals on quality products</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Products Section */}
      <div className="products-section">
        <FilterSidebar 
          onFilterChange={setFilters}
          filters={filters}
        />
        
        <div className="products-content">
          <div className="products-header">
            <h2>
              {searchTerm ? `Search results for "${searchTerm}"` : 
               filters.category ? `${filters.category} Products` : 
               'All Products'}
            </h2>
            <span className="product-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <i className="bi bi-inbox no-products-icon"></i>
              <h3>No Products Found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    category: '',
                    maxPrice: 10000,
                    inStockOnly: false,
                    sortBy: ''
                  });
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  fallbackImage={unplugged}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeEnhanced;
