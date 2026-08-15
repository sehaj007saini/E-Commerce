import React from "react";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ products, onAddToCart, onToggleWishlist, wishlist }) => {
  return (
    <section className="featured-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Featured Picks</p>
          <h2>Top Trending Products</h2>
        </div>
      </div>

      <div className="featured-grid">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlist.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
