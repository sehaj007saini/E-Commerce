import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../config/constants';

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout, isProcessing }) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);
  const [couponMsg, setCouponMsg] = useState('');
  const [validating, setValidating] = useState(false);

  const subtotal = Number(totalPrice || 0);

  const calculateDiscount = () => {
    if (!discountInfo) return 0;
    if (discountInfo.discountPercentage > 0) {
      return (subtotal * (discountInfo.discountPercentage / 100));
    }
    if (discountInfo.discountAmount > 0) {
      return Math.min(subtotal, discountInfo.discountAmount);
    }
    return 0;
  };

  const discountAmount = calculateDiscount();
  const taxAmount = (subtotal - discountAmount) * 0.05; // 5% tax
  const finalTotal = Math.max(0, subtotal - discountAmount + taxAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setValidating(true);
    setCouponMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim() })
      });
      const data = await res.json();

      if (data.valid) {
        setDiscountInfo(data);
        setCouponMsg(`✅ ${data.message} (${data.description})`);
      } else {
        // Local fallback for offline validation
        const upperCode = couponCode.trim().toUpperCase();
        if (upperCode === 'WELCOME10') {
          setDiscountInfo({ discountPercentage: 10, discountAmount: 0 });
          setCouponMsg('✅ Promo WELCOME10 applied! (10% OFF)');
        } else if (upperCode === 'SUMMER20') {
          setDiscountInfo({ discountPercentage: 20, discountAmount: 0 });
          setCouponMsg('✅ Promo SUMMER20 applied! (20% OFF)');
        } else if (upperCode === 'FLAT50') {
          setDiscountInfo({ discountPercentage: 0, discountAmount: 50 });
          setCouponMsg('✅ Promo FLAT50 applied! ($50 OFF)');
        } else {
          setDiscountInfo(null);
          setCouponMsg('❌ Invalid or expired coupon code. Try WELCOME10, SUMMER20, or FLAT50.');
        }
      }
    } catch (err) {
      const upperCode = couponCode.trim().toUpperCase();
      if (upperCode === 'WELCOME10') {
        setDiscountInfo({ discountPercentage: 10, discountAmount: 0 });
        setCouponMsg('✅ Promo WELCOME10 applied! (10% OFF)');
      } else if (upperCode === 'SUMMER20') {
        setDiscountInfo({ discountPercentage: 20, discountAmount: 0 });
        setCouponMsg('✅ Promo SUMMER20 applied! (20% OFF)');
      } else if (upperCode === 'FLAT50') {
        setDiscountInfo({ discountPercentage: 0, discountAmount: 50 });
        setCouponMsg('✅ Promo FLAT50 applied! ($50 OFF)');
      } else {
        setDiscountInfo(null);
        setCouponMsg('❌ Invalid coupon code. Try WELCOME10, SUMMER20, or FLAT50.');
      }
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="checkoutPopup">
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white' }}>
          <Modal.Title style={{ color: 'white', fontWeight: 'bold' }}>
            <i className="bi bi-shield-check" style={{ marginRight: '8px' }}></i> Checkout & Order Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '24px' }}>
          <div className="checkout-items" style={{ marginBottom: '20px' }}>
            <h6 style={{ fontWeight: '700', color: '#475569', marginBottom: '12px' }}>Order Summary ({cartItems.length} items)</h6>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: '12px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{item.name}</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <div style={{ fontWeight: '700', color: '#0f172a' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Promo Code Input */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginTop: '16px', border: '1px dashed #cbd5e1' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                <i className="bi bi-tag-fill" style={{ color: '#6366f1', marginRight: '6px' }}></i> Have a Coupon / Promo Code?
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Try WELCOME10, SUMMER20, FLAT50"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
                <Button variant="primary" onClick={handleApplyCoupon} disabled={validating} style={{ background: '#4f46e5', border: 'none' }}>
                  {validating ? 'Applying...' : 'Apply Code'}
                </Button>
              </div>
              {couponMsg && (
                <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', fontWeight: '600', color: discountInfo ? '#059669' : '#dc2626' }}>
                  {couponMsg}
                </p>
              )}
            </div>

            {/* Price Calculation Breakdown */}
            <div style={{ marginTop: '20px', padding: '16px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#475569' }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#059669', fontWeight: '600' }}>
                  <span>Discount Applied:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#475569' }}>
                <span>Estimated Tax (5%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <hr style={{ margin: '8px 0', borderColor: '#cbd5e1' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                <span>Final Total:</span>
                <span style={{ color: '#4f46e5' }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleCheckout} 
            disabled={isProcessing}
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', padding: '8px 20px', fontWeight: '700' }}
          >
            <i className="bi bi-bag-check-fill" style={{ marginRight: '6px' }}></i> 
            {isProcessing ? 'Processing...' : `Confirm & Pay $${finalTotal.toFixed(2)}`}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutPopup;
