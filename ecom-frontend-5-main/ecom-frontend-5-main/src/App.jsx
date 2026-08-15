import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Wishlist from "./components/Wishlist";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import OrderHistory from "./components/OrderHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProduct from "./components/UpdateProduct";
import Chatbot from "./components/Chatbot";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Navbar onSelectCategory={handleCategorySelect} />
          <Routes>
            <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add_product" 
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              } 
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route 
              path="/product/update/:id" 
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Chatbot />
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
