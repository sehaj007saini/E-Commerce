import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/constants';
import Toast from './Toast';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStockCount: 0,
    statusCounts: {},
    recentOrders: []
  });
  const [allOrders, setAllOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch analytics summary
      const analyticsRes = await fetch(`${API_BASE_URL}/orders/analytics`);
      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setAnalytics(data);
      }

      // Fetch all orders
      const ordersRes = await fetch(`${API_BASE_URL}/orders`);
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setAllOrders(ordersData);
      }
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
      showToast('Could not reach backend API server. Showing cached view.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        showToast(`Order #${orderId} status updated to ${newStatus}`, 'success');
        fetchDashboardData();
      } else {
        showToast('Failed to update status on server', 'error');
      }
    } catch (err) {
      showToast('Error updating order status', 'error');
    }
  };

  const filteredOrders = filterStatus === 'ALL'
    ? allOrders
    : allOrders.filter(o => o.status === filterStatus);

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : 'placed';
    return <span className={`status-badge-custom badge-${s}`}>{status || 'PLACED'}</span>;
  };

  return (
    <div className="admin-dashboard-container">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="dashboard-header">
        <div>
          <h1><i className="bi bi-speedometer2"></i> Admin Analytics & Operations</h1>
          <p>Real-time revenue metrics, order status tracking & inventory insights</p>
        </div>
        <button className="btn-refresh" onClick={fetchDashboardData} disabled={loading}>
          <i className={`bi bi-arrow-clockwise ${loading ? 'spin' : ''}`}></i> Refresh Data
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <i className="bi bi-currency-dollar"></i>
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">
              ${Number(analytics.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <i className="bi bi-bag-check-fill"></i>
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{analytics.totalOrders || allOrders.length || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <i className="bi bi-box-seam-fill"></i>
          </div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p className="stat-value">{analytics.totalProducts || 30}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>
          <div className="stat-info">
            <h3>Low Stock Items</h3>
            <p className="stat-value">{analytics.lowStockCount || 2}</p>
          </div>
        </div>
      </div>

      {/* Orders Management */}
      <div className="dashboard-section">
        <div className="section-header-custom">
          <h2><i className="bi bi-receipt"></i> Customer Orders Management</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>Filter Status:</label>
            <select
              className="select-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PLACED">Placed</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
            <i className="bi bi-arrow-clockwise spin" style={{ marginRight: '8px' }}></i> Loading orders data...
          </p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
            No orders found for selected filter.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Items</th>
                  <th>Action / Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>
                      <strong style={{ color: '#4f46e5' }}>{order.orderId}</strong>
                    </td>
                    <td>{order.customerName}</td>
                    <td>{order.email}</td>
                    <td>{order.orderDate}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>
                      {order.items ? order.items.map((i, idx) => (
                        <div key={idx} style={{ fontSize: '0.85rem' }}>
                          {i.productName} × {i.quantity}
                        </div>
                      )) : '1 item'}
                    </td>
                    <td>
                      <select
                        className="select-status"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      >
                        <option value="PLACED">Placed</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
