import React from 'react';
import '../styles/LoadingSkeleton.css';

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton-category"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-title-short"></div>
        <div className="skeleton-brand"></div>
        <div className="skeleton-footer">
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="product-grid-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default { ProductCardSkeleton, ProductGridSkeleton, LoadingSpinner };
