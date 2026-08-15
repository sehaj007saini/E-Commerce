import { useState, useEffect, createContext } from "react";
import productService from "../services/productService";

const AppContext = createContext({
  data: [],
  isError: "",
  isLoading: false,
  cart: [],
  wishlist: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  toggleWishlist: (product) => {},
  refreshData: () => {},
  clearCart: () => {},
  updateCartItemQuantity: (productId, quantity) => {}
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  /**
   * Add product to cart
   */
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      
      let updatedCart;
      if (existingProductIndex !== -1) {
        // Update quantity if product already in cart
        updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stockQuantity) }
            : item
        );
      } else {
        // Add new product to cart
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  /**
   * Remove product from cart
   */
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  /**
   * Toggle wishlist items
   */
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      const updated = exists
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, { ...product }];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * Update cart item quantity
   */
  const updateCartItemQuantity = (productId, quantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stockQuantity)) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  /**
   * Refresh product data from API
   */
  const refreshData = async () => {
    setIsLoading(true);
    setIsError("");
    
    try {
      const result = await productService.getAllProducts();
      
      if (result.success) {
        setData(result.data);
      } else {
        setIsError(result.error.message || "Failed to load products");
      }
    } catch (error) {
      setIsError("An unexpected error occurred while loading products");
      console.error('Error in refreshData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist]);

  const contextValue = {
    data,
    isError,
    isLoading,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    toggleWishlist,
    refreshData,
    clearCart,
    updateCartItemQuantity
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;