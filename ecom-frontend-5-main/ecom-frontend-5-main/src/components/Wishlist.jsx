import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useContext(AppContext);

  return (
    <main className="product-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Your Wishlist</p>
          <h2>Saved products you love</h2>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <h3>Your wishlist is empty</h3>
          <p>Tap the heart on any product to save it for later.</p>
          <Link to="/" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <article className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-card-link">
                <div className="product-image-wrapper">
                  <img
                    className="product-image"
                    src={product.imageUrl || unplugged}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = unplugged;
                    }}
                  />
                </div>
              </Link>
              <div className="product-card-body">
                <div>
                  <h5 className="product-name">{product.name}</h5>
                  <span className="product-brand">{product.brand}</span>
                </div>
                <div className="product-meta">
                  <strong>${product.price}</strong>
                </div>
                <div className="product-card-footer">
                  <button
                    className="btn btn-primary add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={!product.productAvailable}
                  >
                    Add to cart
                  </button>
                  <button
                    className="btn btn-outline-secondary wishlist-btn active"
                    onClick={() => toggleWishlist(product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Wishlist;
