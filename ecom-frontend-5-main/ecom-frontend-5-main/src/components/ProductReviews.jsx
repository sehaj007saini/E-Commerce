import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/constants';
import { useAuth } from '../Context/AuthContext';
import Toast from './Toast';

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState(user?.username || '');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please enter your review comment', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
          reviewerName: reviewerName.trim() || 'Verified Buyer'
        })
      });

      if (res.ok) {
        showToast('Review submitted successfully!', 'success');
        setComment('');
        fetchReviews();
      } else {
        showToast('Failed to post review', 'error');
      }
    } catch (err) {
      // Offline fallback addition
      const mockReview = {
        id: Date.now(),
        rating,
        comment,
        reviewerName: reviewerName || 'Verified Customer',
        createdAt: new Date().toISOString()
      };
      setReviews([mockReview, ...reviews]);
      setComment('');
      showToast('Review posted (Offline mode)', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverage = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (starRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${i <= starRating ? 'bi-star-fill' : 'bi-star'}`}
          style={{ color: i <= starRating ? '#f59e0b' : '#cbd5e1', marginRight: '2px' }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '2px solid #f1f5f9' }}>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#1e293b' }}>
          Customer Reviews & Ratings
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef3c7', padding: '6px 14px', borderRadius: '20px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#b45309' }}>⭐ {calculateAverage()}</span>
          <span style={{ fontSize: '0.85rem', color: '#92400e' }}>({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Submission Form */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#334155' }}>Write a Review</h4>
        <form onSubmit={handleSubmitReview}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>Your Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi ${(hoverRating || rating) >= star ? 'bi-star-fill' : 'bi-star'}`}
                  style={{
                    fontSize: '1.5rem',
                    color: (hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1',
                    cursor: 'pointer',
                    marginRight: '6px'
                  }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                ></i>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Your Name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
            <input
              type="text"
              placeholder="Share details of your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Review List */}
      {loading ? (
        <p style={{ color: '#64748b' }}>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No reviews yet. Be the first to review this product!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reviews.map((rev) => (
            <div key={rev.id || Math.random()} style={{ background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ color: '#1e293b' }}>{rev.reviewerName || 'Customer'}</strong>
                <div>{renderStars(rev.rating)}</div>
              </div>
              <p style={{ margin: '0', color: '#475569', fontSize: '0.92rem' }}>{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
