import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted, fallbackImage }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { id, brand, name, price, productAvailable, stockQuantity, imageUrl, category } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-card-link">
        {/* Badges */}
        <div className="product-badges">
          {!productAvailable && (
            <span className="badge badge-out-of-stock">Out of Stock</span>
          )}
          {productAvailable && stockQuantity < 10 && (
            <span className="badge badge-low-stock">Low Stock</span>
          )}
          {productAvailable && stockQuantity >= 50 && (
            <span className="badge badge-in-stock">In Stock</span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        {onToggleWishlist && (
          <button 
            className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
        )}

        {/* Image */}
        <div className="product-image-wrapper">
          {!isImageLoaded && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <img
            src={imageUrl}
            alt={name}
            className={`product-image ${isImageLoaded ? 'loaded' : ''}`}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              e.target.src = fallbackImage;
              setIsImageLoaded(true);
            }}
            style={{ opacity: isImageLoaded ? 1 : 0 }}
          />
          <div className="image-overlay">
            <i className="bi bi-eye-fill"></i>
            <span>View Details</span>
          </div>
        </div>

        {/* Content */}
        <div className="product-card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="product-category">{category}</div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#b45309', background: '#fef3c7', padding: '2px 8px', borderRadius: '12px' }}>
              ⭐ {product.averageRating ? product.averageRating : '4.8'}
            </span>
          </div>
          
          <h5 className="product-title">{name}</h5>
          
          <p className="product-brand">
            <i className="bi bi-tag-fill"></i>
            {brand}
          </p>

          <div className="product-footer">
            <div className="product-price-section">
              <span className="product-price">${price}</span>
              {productAvailable && (
                <span className="product-stock">
                  <i className="bi bi-box-seam"></i>
                  {stockQuantity} available
                </span>
              )}
            </div>

            <button
              className={`btn-add-to-cart ${!productAvailable ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!productAvailable}
            >
              {productAvailable ? (
                <>
                  <i className="bi bi-cart-plus"></i>
                  Add to Cart
                </>
              ) : (
                <>
                  <i className="bi bi-x-circle"></i>
                  Unavailable
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
