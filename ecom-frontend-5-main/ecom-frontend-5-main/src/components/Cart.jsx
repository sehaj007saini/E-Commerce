// import React, { useContext, useState, useEffect } from "react";
// // import axios from '../axios';
// import AppContext from "../Context/Context";
// import axios from "axios";
// import CheckoutPopup from "./CheckoutPopup";
// import { Button } from "react-bootstrap";
// const Cart = () => {
//   const { cart, removeFromCart } = useContext(AppContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [cartImage, setCartImage] =useState([])
//   const [showModal, setShowModal] = useState(false);
  
//   // useEffect(() => {
//   //   const fetchImagesAndUpdateCart = async () => {
//   //     console.log("Cart", cart);
//   //     const updatedCartItems = await Promise.all(
//   //       cart.map(async (item) => {
//   //         console.log("ITEM",item)
//   //         try {
//   //           const response = await axios.get(
//   //             `http://localhost:8080/api/product/${item.id}/image`,
//   //             { responseType: "blob" }
//   //           );
//             // const imageFile = await converUrlToFile(response.data,response.data.imageName)
//   //           setCartImage(imageFile);
//   //           const imageUrl = URL.createObjectURL(response.data);
//   //           return { ...item, imageUrl, available: true };
//   //         } catch (error) {
//   //           console.error("Error fetching image:", error);
//   //           return { ...item, imageUrl: "placeholder-image-url", available: false };
//   //         }
//   //       })
//   //     );
//   //     const filteredCartItems = updatedCartItems.filter((item) => item.available);
//   //     setCartItems(updatedCartItems);
     
//   //   };

//   //   if (cart.length) {
//   //     fetchImagesAndUpdateCart();
//   //   }
//   // }, [cart]);

//   useEffect(() => {
//     const fetchImagesAndUpdateCart = async () => {
//       try {
    
//         const response = await axios.get("http://localhost:8080/api/products");
//         const backendProductIds = response.data.map((product) => product.id);

//         const updatedCartItems = cart.filter((item) => backendProductIds.includes(item.id));
//         const cartItemsWithImages = await Promise.all(
//           updatedCartItems.map(async (item) => {
//             try {
//               const response = await axios.get(
//                 `http://localhost:8080/api/product/${item.id}/image`,
//                 { responseType: "blob" }
//               );
//               const imageFile = await converUrlToFile(response.data, response.data.imageName);
//               setCartImage(imageFile)
//               const imageUrl = URL.createObjectURL(response.data);
//               return { ...item, imageUrl };
//             } catch (error) {
//               console.error("Error fetching image:", error);
//               return { ...item, imageUrl: "placeholder-image-url" };
//             }
//           })
//         );

//         setCartItems(cartItemsWithImages);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
    
//       }
//     };

//     if (cart.length) {
//       fetchImagesAndUpdateCart();
//     }
//   }, [cart]);
  


//   useEffect(() => {
//     console.log("CartItems", cartItems);
//   }, [cartItems]);
//   const converUrlToFile = async(blobData, fileName) => {
//     const file = new File([blobData], fileName, { type: blobData.type });
//     return file;
//   }
//   useEffect(() => {
//     const total = cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalPrice(total);
//   }, [cartItems]);

 
//   const handleIncreaseQuantity = (itemId) => {
//     const newCartItems = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(newCartItems);
//   };
//   const handleDecreaseQuantity = (itemId) => {
//     const newCartItems = cartItems.map((item) =>
//       item.id === itemId
//         ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
//         : item
//     );
//     setCartItems(newCartItems);
//   };

//   const handleRemoveFromCart = (itemId) => {
//     removeFromCart(itemId);
//     const newCartItems = cartItems.filter((item) => item.id !== itemId);
//     setCartItems(newCartItems);
//   };

//   const handleCheckout = async () => {
//     try {
//       for (const item of cartItems) {
//         const { imageUrl, imageName, imageData, imageType, quantity, ...rest } = item;
//         const updatedStockQuantity = item.stockQuantity - item.quantity;
  
//         const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };
//         console.log("updated product data", updatedProductData)
  
//         const cartProduct = new FormData();
//         cartProduct.append("imageFile", cartImage);
//         cartProduct.append(
//           "product",
//           new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
//         );
  
//         await axios
//           .put(`http://localhost:8080/api/product/${item.id}`, cartProduct, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((response) => {
//             console.log("Product updated successfully:", (cartProduct));
            
//           })
//           .catch((error) => {
//             console.error("Error updating product:", error);
//           });
//       }
//       setCartItems([]);
//       setShowModal(false);
//     } catch (error) {
//       console.log("error during checkout", error);
//     }
//   };
  
//   return (
//     <div className="cart-container">
//       <div className="shopping-cart">
//         <div className="title">Shopping Bag</div>
//         {cartItems.length === 0 ? (
//           <div className="empty" style={{ textAlign: "left", padding: "2rem" }}>
//             <h4>Your cart is empty</h4>
//           </div>
//         ) : (
//           <>
//             {cartItems.map((item) => (
//               <li key={item.id} className="cart-item">
//                 <div
//                   className="item"
//                   style={{ display: "flex", alignContent: "center" }}
//                   key={item.id}
//                 >
//                   <div className="buttons">
//                     <div className="buttons-liked">
//                       <i className="bi bi-heart"></i>
//                     </div>
//                   </div>
//                   <div>
//                     <img
//                       // src={cartImage ? URL.createObjectURL(cartImage) : "Image unavailable"}
//                       src={item.imageUrl}
//                       alt={item.name}
//                       className="cart-item-image"
//                     />
//                   </div>
//                   <div className="description">
//                     <span>{item.brand}</span>
//                     <span>{item.name}</span>
//                   </div>

//                   <div className="quantity">
//                     <button
//                       className="plus-btn"
//                       type="button"
//                       name="button"
//                       onClick={() => handleIncreaseQuantity(item.id)}
//                     >
//                       <i className="bi bi-plus-square-fill"></i>
//                     </button>
//                     <input
//                       type="button"
//                       name="name"
//                       value={item.quantity}
//                       readOnly
//                     />
//                     <button
//                       className="minus-btn"
//                       type="button"
//                       name="button"
//                       // style={{ backgroundColor: "white" }}
//                       onClick={() => handleDecreaseQuantity(item.id)}
//                     >
//                       <i className="bi bi-dash-square-fill"></i>
//                     </button>
//                   </div>

//                   <div className="total-price " style={{ textAlign: "center" }}>
//                     ${item.price * item.quantity}
//                   </div>
//                   <button
//                     className="remove-btn"
//                     onClick={() => handleRemoveFromCart(item.id)}
//                   >
//                     <i className="bi bi-trash3-fill"></i>
//                   </button>
//                 </div>
//               </li>
//             ))}
//             <div className="total">Total: ${totalPrice}</div>
//             <button
//               className="btn btn-primary"
//               style={{ width: "100%" }}
//               onClick={handleCheckout}
//             >
//               Checkout
//             </button>
//           </>
//         )}
//       </div>
//       <CheckoutPopup
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         cartItems={cartItems}
//         totalPrice={totalPrice}
//         handleCheckout={handleCheckout}
//       />
//     </div>

//   );
// };

// export default Cart;





import React, { useContext, useState } from "react";
import AppContext from "../Context/Context";
import CheckoutPopup from "./CheckoutPopup";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleIncreaseQuantity = (itemId) => {
    const item = cart.find((product) => product.id === itemId);
    if (!item) return;

    if (item.quantity < item.stockQuantity) {
      updateCartItemQuantity(itemId, item.quantity + 1);
    } else {
      alert("Cannot add more than available stock");
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cart.find((product) => product.id === itemId);
    if (!item) return;

    if (item.quantity > 1) {
      updateCartItemQuantity(itemId, item.quantity - 1);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    clearCart();
    setShowModal(false);
    alert("Checkout complete. Your cart is now empty.");
  };

  return (
    <main className="cart-layout">
      <section className="cart-panel">
        <h2>Shopping Bag</h2>
        {cart.length === 0 ? (
          <div className="empty-state-card">
            <h4>Your cart is empty</h4>
            <p>Browse products and add your favorites to see them here.</p>
          </div>
        ) : (
          <div className="cart-items-panel">
            {cart.map((item) => (
              <article className="cart-card" key={item.id}>
                <img
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-description">
                  <span>{item.name}</span>
                  <span className="muted-text">{item.brand}</span>
                  <span className="unit-price">${item.price.toFixed(2)} each</span>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button type="button" onClick={() => handleDecreaseQuantity(item.id)}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <input type="text" value={item.quantity} readOnly />
                    <button type="button" onClick={() => handleIncreaseQuantity(item.id)}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="remove-btn btn btn-outline-secondary" onClick={() => removeFromCart(item.id)}>
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </article>
            ))}

            <div className="summary-card summary-actions">
              <div className="summary-row">
                <span>Items</span>
                <strong>{cart.length}</strong>
              </div>
              <div className="summary-row">
                <span>Total</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Checkout
              </button>
              <button className="btn btn-outline-secondary" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </div>
        )}
      </section>

      <aside className="cart-summary">
        <h3>Order summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
        <p className="text-muted">Shipping and taxes calculated at checkout.</p>
      </aside>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cart}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </main>

  );
};

export default Cart;
