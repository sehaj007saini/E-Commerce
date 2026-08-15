# E-Commerce Frontend

A modern, feature-rich React e-commerce application built with Vite, featuring product management, shopping cart, and order processing capabilities.

## ✨ Features

### Product Management
- Browse products with responsive grid layout
- View detailed product information
- Filter products by category
- Real-time stock availability
- Product images with fallback support
- Add, update, and delete products

### Shopping Cart
- Add products to cart with quantity management
- Persistent cart using localStorage
- Real-time price calculation
- Stock validation
- Visual cart management

### User Experience
- Loading states and spinners
- User-friendly error messages
- Form validation with real-time feedback
- Image upload with preview
- Responsive design
- Bootstrap UI components

## 🛠️ Tech Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.2.8
- **Routing:** React Router DOM 6.22.3
- **HTTP Client:** Axios 1.6.8
- **Styling:** Bootstrap 5.3.3 + Custom CSS
- **Icons:** Bootstrap Icons 1.11.3, React Icons 5.2.0
- **State Management:** React Context API

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Home.jsx        # Product listing page
│   ├── Product.jsx     # Product detail page
│   ├── AddProduct.jsx  # Add product form
│   ├── UpdateProduct.jsx # Update product form
│   ├── Cart.jsx        # Shopping cart
│   ├── CheckoutPopup.jsx # Checkout modal
│   └── Navbar.jsx      # Navigation bar
├── Context/
│   └── Context.jsx     # Global state management
├── services/
│   ├── productService.js # Product API calls
│   └── orderService.js   # Order API calls
├── utils/
│   ├── validation.js   # Form validation utilities
│   └── errorHandler.js # Error handling utilities
├── config/
│   └── constants.js    # Application constants
├── assets/             # Images and static files
├── axios.jsx           # Axios configuration
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   cd ecom-frontend-5-main/ecom-frontend-5-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file if you need to change API URL:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Application Settings
VITE_APP_NAME=E-Commerce Store
VITE_MAX_CART_ITEMS=99
```

### API Endpoints
The application connects to these backend endpoints:
- `GET /api/products` - Get all products
- `GET /api/product/{id}` - Get single product
- `GET /api/product/{id}/image` - Get product image
- `POST /api/product` - Create product
- `PUT /api/product/{id}` - Update product
- `DELETE /api/product/{id}` - Delete product
- `POST /api/orders` - Place order

## 📱 Features in Detail

### Product Browsing
- Grid layout with responsive design
- Product cards showing image, name, brand, price
- Stock availability indicator
- Category filtering
- Out of stock badge

### Add/Edit Products
- Form validation with real-time feedback
- Image upload with preview
- File type and size validation (max 10MB)
- Category selection
- Stock quantity management
- Product availability toggle

### Shopping Cart
- Persistent cart using localStorage
- Quantity increment/decrement
- Stock limit enforcement
- Real-time total calculation
- Remove items
- Clear cart
- Checkout with order confirmation

### Error Handling
- User-friendly error messages
- Network error detection
- Validation errors display
- Loading states
- Retry mechanisms

## 🎨 UI Components

### Home Page
- Product grid with filtering
- Add to cart functionality
- Stock status display
- Loading spinner
- Error state with retry

### Product Detail Page
- Large product image
- Full product information
- Add to cart
- Update/Delete buttons
- Stock availability

### Cart Page
- Cart items list with images
- Quantity controls
- Price calculation
- Checkout button
- Empty cart state

## 🔒 Validation

### Product Validation
- Name: 2-100 characters
- Brand: Required
- Description: Minimum 5 characters
- Price: Must be > 0
- Stock: Must be >= 0
- Category: Required
- Release date: Required
- Image: JPEG, PNG, GIF, WebP, max 10MB

### Order Validation
- Customer name: Minimum 2 characters
- Email: Valid format
- Shipping address: Minimum 10 characters
- Items: Cart not empty

## 🛡️ Error Handling

The application handles:
- Network errors
- API errors (400, 404, 500, etc.)
- Validation errors
- File upload errors
- Authentication errors (ready for future implementation)

## 📊 State Management

Uses React Context API for:
- Product list
- Shopping cart
- Loading states
- Error states
- Cart operations

## 🎓 Best Practices Implemented

1. **Service Layer Pattern** - Separated API logic from components
2. **Error Boundaries** - Graceful error handling
3. **Loading States** - Better UX with loading indicators
4. **Validation** - Client-side validation before API calls
5. **Code Reusability** - Utility functions and service modules
6. **Responsive Design** - Mobile-friendly layout
7. **Accessibility** - Semantic HTML and ARIA labels

## 🐛 Troubleshooting

### Common Issues

**Issue:** Cannot connect to backend
- **Solution:** Ensure backend is running on `http://localhost:8080`
- Check `.env` file for correct API URL

**Issue:** Images not loading
- **Solution:** Check backend image service
- Verify image files exist
- Check console for CORS errors

**Issue:** Cart not persisting
- **Solution:** Check browser localStorage
- Clear localStorage and try again
- Check browser console for errors

**Issue:** Form validation not working
- **Solution:** Check browser console for errors
- Ensure all required fields are filled
- Verify file size and type for images

## 📈 Performance

- Lazy loading of images
- Efficient state updates
- Minimal re-renders
- Optimized build size
- Code splitting (via Vite)

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Order history page
- [ ] Product search functionality
- [ ] Advanced filtering and sorting
- [ ] Wishlist feature
- [ ] Product reviews and ratings
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Toast notifications
- [ ] Dark mode
- [ ] PWA support

## 📚 Documentation

- [Frontend Improvements](./FRONTEND_IMPROVEMENTS.md) - Detailed improvement documentation
- [Backend API Documentation](../../SpringEcom/README_API.md)
- [Backend Setup Guide](../../SpringEcom/SETUP.md)

## 🤝 Contributing

1. Follow the existing code structure
2. Use ESLint rules
3. Add proper error handling
4. Include validation for forms
5. Test on different screen sizes
6. Update documentation

## 📄 License

This project is part of a learning exercise.

## 🙏 Acknowledgments

- Bootstrap for UI components
- React team for the framework
- Vite for the build tool
- All open-source contributors

---

**Built with ❤️ using React and Vite**
