import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import { useAuth } from "../Context/AuthContext";
import axios from "../axios";
import { getProductImageUrl } from "../utils/productImages";
import ProductReviews from "./ProductReviews";
import "../styles/Product.css";

const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } =
    useContext(AppContext);
  const { isAdmin } = useAuth();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        fetchImage(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async (prodData) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        if (response.data && response.data.size > 0) {
          setImageUrl(URL.createObjectURL(response.data));
        } else {
          setImageUrl(getProductImageUrl(prodData));
        }
      } catch (err) {
        setImageUrl(getProductImageUrl(prodData));
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      console.log("Product deleted successfully");
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };
  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <main className="product-page">
      <div className="product-hero">
        <div className="product-image-container">
          <img
            className="product-image-detail"
            src={imageUrl}
            alt={product.imageName}
          />
        </div>

        <div className="product-info">
          <div className="product-description">
            <div className="product-title-row">
              <span className="product-category">{product.category}</span>
              <span className="release-date">
                Listed: <i>{new Date(product.releaseDate).toLocaleDateString()}</i>
              </span>
            </div>

            <h1 className="product-title">{product.name}</h1>
            <span className="product-brand">{product.brand}</span>
            <p style={{ margin: "1.4rem 0 0.6rem", fontWeight: "700" }}>
              PRODUCT DESCRIPTION:
            </p>
            <p>{product.description}</p>
          </div>

          <div className="product-meta">
            <strong>${product.price}</strong>
            <span>
              Stock Available: <strong style={{ color: product.productAvailable ? "#16a34a" : "#ef4444" }}>
                {product.stockQuantity}
              </strong>
            </span>
            <span>Status: {product.productAvailable ? "In Stock" : "Out of Stock"}</span>
          </div>

          <div className="product-actions">
            <button
              className="btn btn-primary"
              onClick={handlAddToCart}
              disabled={!product.productAvailable}
            >
              {product.productAvailable ? "Add to cart" : "Out of Stock"}
            </button>
            {isAdmin && (
              <>
                <button className="btn btn-outline-secondary" type="button" onClick={handleEditClick}>
                  Update
                </button>
                <button className="btn btn-danger" type="button" onClick={deleteProduct}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ProductReviews productId={id} />
    </main>
  );
};

export default Product;