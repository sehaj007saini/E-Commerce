import React from "react";
import { Link } from "react-router-dom";
import unplugged from "../assets/unplugged.png";

const Hero = () => {
  return (
    <section className="hero-banner">
      <div className="hero-copy">
        <span className="eyebrow">Welcome Back</span>
        <h1>Shop the best tech essentials for your everyday life.</h1>
        <p>Discover trending gadgets, exclusive offers, and quick checkout for a seamless shopping experience.</p>
        <div className="hero-actions">
          <Link to="/" className="btn btn-primary">
            Shop now
          </Link>
          <Link to="/wishlist" className="btn btn-outline-secondary">
            Your wishlist
          </Link>
        </div>
      </div>
      <div className="hero-image">
        <img src={unplugged} alt="Shopping essentials" />
      </div>
    </section>
  );
};

export default Hero;
