import React from "react";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div>
          <h4>E-Commerce Store</h4>
          <p>Modern shopping experience for everyday electronics.</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/add_product">Add Product</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
      <div className="footer-note">© {new Date().getFullYear()} E-Commerce Store. Made for fast shopping.</div>
    </footer>
  );
};

export default Footer;
