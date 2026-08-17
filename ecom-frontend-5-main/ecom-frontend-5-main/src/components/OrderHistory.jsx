import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/constants';
import { useAuth } from '../Context/AuthContext';
import Toast from './Toast';
import '../styles/AdminDashboard.css';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (!user || !user.email) {
        showToast('Please login to view your orders', 'warning');
        setOrders([]);
        setLoading(false);
        return;
      }

      const url = `${API_BASE_URL}/orders/user/${encodeURIComponent(user.email)}`;
      console.log('Fetching orders from:', url);
      console.log('User email:', user.email);
      
      const res = await fetch(url);
      console.log('Response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('Orders received:', data);
        setOrders(data);
      } else if (res.status === 404) {
        console.log('No orders found for user');
        setOrders([]);
      } else {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        showToast('Failed to fetch orders', 'error');
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
      showToast('Error loading orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      fetchOrders();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${searchId.trim()}`);
      if (res.ok) {
        const orderData = await res.json();
        setOrders([orderData]);
      } else {
        showToast('Order ID not found', 'error');
        setOrders([]);
      }
    } catch (err) {
      showToast('Error searching order ID', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'DELETE'
      });

      if (res.ok || res.status === 204) {
        showToast(`Order #${orderId} has been cancelled`, 'info');
        fetchOrders();
      } else {
        showToast('Only PLACED orders can be cancelled', 'warning');
      }
    } catch (err) {
      showToast('Error cancelling order', 'error');
    }
  };

  const getStepClass = (currentStatus, targetStep) => {
    const steps = ['PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    if (currentStatus === 'CANCELLED') return 'step-cancelled';
    
    const currentIndex = steps.indexOf(currentStatus?.toUpperCase());
    const targetIndex = steps.indexOf(targetStep);

    if (currentIndex >= targetIndex) return 'step-completed';
    return 'step-pending';
  };

  return (
    <div className="order-history-wrapper">
      <div className="admin-dashboard-container order-history">
        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />

      <div className="dashboard-header">
        <div>
          <h1><i className="bi bi-truck"></i> My Orders & Order Tracker</h1>
          <p>Track your package delivery progress and view order history</p>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Search by Order ID (e.g. ORD1234)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              width: '280px',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn-refresh" style={{ background: '#4f46e5' }}>
            <i className="bi bi-search"></i> Track
          </button>
        </form>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
          <i className="bi bi-arrow-clockwise spin" style={{ marginRight: '8px' }}></i> Loading orders...
        </p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <i className="bi bi-box2" style={{ fontSize: '3rem', color: '#cbd5e1' }}></i>
          <h3 style={{ marginTop: '12px', color: '#475569' }}>No Orders Found</h3>
          <p style={{ color: '#94a3b8' }}>When you place an order, it will appear here with live tracking updates.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map((order) => (
            <div key={order.orderId} className="dashboard-section" style={{ margin: 0 }}>
              <div className="section-header-custom">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>
                    Order <span style={{ color: '#4f46e5' }}>#{order.orderId}</span>
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Placed on: {order.orderDate} | Customer: {order.customerName} ({order.email})
                  </span>
                </div>
                <div>
                  {order.status === 'PLACED' && (
                    <button
                      onClick={() => handleCancelOrder(order.orderId)}
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="bi bi-x-circle-fill"></i> Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Tracker Line */}
              {order.status === 'CANCELLED' ? (
                <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '12px', color: '#991b1b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="bi bi-x-circle-fill" style={{ fontSize: '1.4rem' }}></i>
                  Order Status: CANCELLED
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '24px 0', padding: '0 20px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50px',
                    right: '50px',
                    height: '4px',
                    background: '#e2e8f0',
                    zIndex: 0
                  }}></div>

                  {[
                    { key: 'PLACED', label: 'Order Placed', icon: 'bi-check-circle-fill' },
                    { key: 'PROCESSING', label: 'Processing', icon: 'bi-gear-wide-connected' },
                    { key: 'SHIPPED', label: 'Shipped', icon: 'bi-truck' },
                    { key: 'DELIVERED', label: 'Delivered', icon: 'bi-house-heart-fill' }
                  ].map((step) => {
                    const isDone = getStepClass(order.status, step.key) === 'step-completed';
                    return (
                      <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: isDone ? 'linear-gradient(135deg, #10b981, #059669)' : '#ffffff',
                          border: isDone ? 'none' : '3px solid #cbd5e1',
                          color: isDone ? '#ffffff' : '#94a3b8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          boxShadow: isDone ? '0 4px 10px rgba(16, 185, 129, 0.3)' : 'none'
                        }}>
                          <i className={`bi ${step.icon}`}></i>
                        </div>
                        <span style={{ marginTop: '8px', fontSize: '0.85rem', fontWeight: isDone ? '700' : '500', color: isDone ? '#059669' : '#64748b' }}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Order Items Table */}
              <div style={{ marginTop: '16px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#334155' }}>Items in this order:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#475569' }}>
                      <span><strong>{item.productName}</strong> × {item.quantity}</span>
                      <span style={{ fontWeight: '600' }}>${Number(item.totalPrice).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default OrderHistory;
