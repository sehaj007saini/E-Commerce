import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { validateProduct, validateImageFile } from "../utils/validation";
import { CATEGORIES } from "../config/constants";
import { getUserFriendlyMessage } from "../utils/errorHandler";
import Toast from "./Toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: true,
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const validation = validateImageFile(file);
      
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, image: validation.error }));
        setImage(null);
        setImagePreview(null);
        showToast(validation.error, 'error');
        return;
      }
      
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: "" }));
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    // Prepare product data with correct types
    const productData = {
      name: product.name.trim(),
      brand: product.brand.trim(),
      description: product.description.trim(),
      price: parseFloat(product.price),
      category: product.category,
      stockQuantity: parseInt(product.stockQuantity) || 0,
      releaseDate: product.releaseDate,
      productAvailable: product.productAvailable
    };
    
    // Validate product data
    const validation = validateProduct(productData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast("Please fix the validation errors before submitting", 'error');
      return;
    }
    
    // Validate image
    if (!image) {
      setErrors(prev => ({ ...prev, image: "Product image is required" }));
      showToast("Please select a product image", 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await productService.createProduct(productData, image);
      
      if (result.success) {
        showToast("Product added successfully!", 'success');
        setTimeout(() => navigate("/"), 1500);
      } else {
        showToast(getUserFriendlyMessage(result.error), 'error');
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.", 'error');
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
      
      <div className="center-container">
        <h2 className="text-center mb-4 mt-4">Add New Product</h2>
        
        <form className="row g-3 pt-3" onSubmit={submitHandler}>
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name <span style={{ color: "red" }}>*</span></h6>
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
              maxLength="100"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Brand */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand <span style={{ color: "red" }}>*</span></h6>
            </label>
            <input
              type="text"
              name="brand"
              className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
            />
            {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label">
              <h6>Description <span style={{ color: "red" }}>*</span></h6>
            </label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
              rows="3"
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          {/* Price */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Price ($) <span style={{ color: "red" }}>*</span></h6>
            </label>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              placeholder="Eg: 1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
              min="0"
              step="0.01"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          {/* Category */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Category <span style={{ color: "red" }}>*</span></h6>
            </label>
            <select
              className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              value={product.category}
              onChange={handleInputChange}
              name="category"
            >
              <option value="">Select category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </div>

          {/* Stock Quantity */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity <span style={{ color: "red" }}>*</span></h6>
            </label>
            <input
              type="number"
              className={`form-control ${errors.stockQuantity ? 'is-invalid' : ''}`}
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
              min="0"
            />
            {errors.stockQuantity && <div className="invalid-feedback">{errors.stockQuantity}</div>}
          </div>

          {/* Release Date */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Release Date <span style={{ color: "red" }}>*</span></h6>
            </label>
            <input
              type="date"
              className={`form-control ${errors.releaseDate ? 'is-invalid' : ''}`}
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
            />
            {errors.releaseDate && <div className="invalid-feedback">{errors.releaseDate}</div>}
          </div>

          {/* Image */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Image <span style={{ color: "red" }}>*</span></h6>
            </label>
            <input
              className={`form-control ${errors.image ? 'is-invalid' : ''}`}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ marginTop: '10px', maxWidth: '200px', maxHeight: '200px' }}
              />
            )}
          </div>

          {/* Product Available */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Product Available
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
