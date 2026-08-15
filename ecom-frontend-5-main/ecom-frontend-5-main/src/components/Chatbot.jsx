import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/constants';
import { getProductImageUrl } from '../utils/productImages';
import './Chatbot.css';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! 👋 I'm your AI Shopping Assistant. How can I help you today?",
    recommendedProducts: [],
    suggestedQuestions: [
      "Show popular laptops",
      "Are there any discount coupons?",
      "Headphones under $200",
      "How to track order?"
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('ecom_chatbot_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('ecom_chatbot_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnread(false);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: queryText,
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply || "I'm here to help you shop!",
        recommendedProducts: data.recommendedProducts || [],
        suggestedQuestions: data.suggestedQuestions || [
          "Show popular products",
          "Discount coupons",
          "Return policy"
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      if (!isOpen) setUnread(true);
    } catch (error) {
      console.error('Chatbot API error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "I'm having trouble reaching the server right now. Make sure the backend server is running on port 8080!",
        recommendedProducts: [],
        suggestedQuestions: ["Show top laptops", "Current coupons"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    sessionStorage.removeItem('ecom_chatbot_messages');
  };

  const handleProductClick = (productId) => {
    setIsOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="chatbot-container">
      {/* Floating Trigger Button */}
      <button
        className={`chatbot-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <>
            <i className="bi bi-robot"></i>
            {unread && <span className="chatbot-badge-pulse"></span>}
          </>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <i className="bi bi-robot"></i>
                <span className="online-indicator"></span>
              </div>
              <div>
                <h5>AI Assistant</h5>
                <span className="chatbot-subtitle">Powered by SpringEcom Intelligence</span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                className="chatbot-icon-btn"
                onClick={handleClearHistory}
                title="Clear Chat History"
              >
                <i className="bi bi-trash3"></i>
              </button>
              <button
                className="chatbot-icon-btn"
                onClick={toggleChat}
                title="Close Window"
              >
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-msg-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="bot-msg-avatar">
                    <i className="bi bi-robot"></i>
                  </div>
                )}

                <div className="chatbot-msg-bubble-wrapper">
                  <div className="chatbot-msg-bubble">
                    <div className="chatbot-msg-text">
                      {msg.text.split('\n').map((line, idx) => (
                        <p key={idx} className="mb-1">{line}</p>
                      ))}
                    </div>

                    {/* Recommended Products Grid */}
                    {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                      <div className="chatbot-products-grid">
                        {msg.recommendedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="chatbot-product-card"
                            onClick={() => handleProductClick(product.id)}
                          >
                            <img
                              src={getProductImageUrl(product)}
                              alt={product.name}
                              className="chatbot-product-img"
                            />
                            <div className="chatbot-product-details">
                              <span className="chatbot-product-brand">{product.brand}</span>
                              <h6 className="chatbot-product-title">{product.name}</h6>
                              <div className="chatbot-product-meta">
                                <span className="chatbot-product-price">
                                  ${product.price ? product.price.toFixed(2) : '0.00'}
                                </span>
                                {product.averageRating > 0 && (
                                  <span className="chatbot-product-rating">
                                    ★ {product.averageRating}
                                  </span>
                                )}
                              </div>
                              <button className="btn btn-sm btn-primary w-100 mt-2 chatbot-view-btn">
                                View Item <i className="bi bi-arrow-right"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="chatbot-msg-time">{msg.timestamp}</span>
                  </div>

                  {/* Suggested Question Pills */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && msg.id === messages[messages.length - 1]?.id && (
                    <div className="chatbot-suggestions">
                      {msg.suggestedQuestions.map((question, qIdx) => (
                        <button
                          key={qIdx}
                          className="chatbot-suggestion-pill"
                          onClick={() => handleSendMessage(question)}
                          disabled={loading}
                        >
                          ✨ {question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {loading && (
              <div className="chatbot-msg-row bot-row">
                <div className="bot-msg-avatar">
                  <i className="bi bi-robot"></i>
                </div>
                <div className="chatbot-msg-bubble typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form
            className="chatbot-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask AI about products, coupons, orders..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!input.trim() || loading}
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
