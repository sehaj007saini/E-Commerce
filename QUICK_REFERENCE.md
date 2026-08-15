# Quick Reference Guide

## 🚀 Start the Application

```bash
# Terminal 1 - Start Backend (Port 8081)
cd SpringEcom
.\mvnw.cmd spring-boot:run

# Terminal 2 - Start Frontend (Port 5173)
cd ecom-frontend-5-main/ecom-frontend-5-main
npm run dev
```

## 🔑 Admin Login

**URL**: http://localhost:5173/login

**Credentials**:
- Username: `admin`
- Password: `admin123`

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173/ |
| Backend API | http://localhost:8080/api |
| Login Page | http://localhost:5173/login |

## 🗄️ Database

| Config | Value |
|--------|-------|
| Host | localhost:5432 |
| Database | telusko2 |
| Username | postgres |
| Password | (see .env file) |

## 👤 User Types

### Regular User (Default)
- ✅ Browse products
- ✅ Search & filter
- ✅ Add to cart/wishlist
- ❌ Cannot add products
- ❌ Cannot update products
- ❌ Cannot delete products

### Admin (After Login)
- ✅ All regular user features
- ✅ Add new products
- ✅ Update existing products
- ✅ Delete products
- ✅ Access protected routes

## 📋 Sample Products

30 products loaded automatically from `data.sql`:
- **Laptops**: 5 items
- **Headphones**: 6 items
- **Mobile**: 4 items
- **Electronics**: 6 items
- **Toys**: 4 items
- **Fashion**: 5 items

## 🎯 Key Features

- **Modern UI**: Purple gradient theme
- **Toast Notifications**: Professional feedback
- **Loading Skeletons**: Smooth loading states
- **Stock Badges**: Visual stock indicators
- **Advanced Filters**: Category, price, stock
- **Real-time Search**: Instant results
- **Responsive Design**: Mobile-friendly

## 🔧 Important Ports

- ✅ Backend: **8080**
- ✅ Frontend: **5173**
- ✅ PostgreSQL: **5432**

## 📝 Admin Actions

| Action | Route | Access |
|--------|-------|--------|
| Add Product | `/add_product` | Admin only |
| Update Product | `/product/update/:id` | Admin only |
| Delete Product | Button on product page | Admin only |
| View Products | `/` | Everyone |
| Search | Navbar | Everyone |
| Cart/Wishlist | `/cart`, `/wishlist` | Everyone |

## 💡 Quick Tips

1. **Login Persistence**: Admin stays logged in (localStorage)
2. **Auto-redirect**: Protected routes redirect to home if not admin
3. **Update/Delete Buttons**: Only visible to admin on product pages
4. **Add Product Link**: Only visible in navbar for admin
5. **Logout**: Red button in navbar (admin only)
6. **Login Button**: Blue button in navbar (when not logged in)

## 🐛 Troubleshooting

### Backend not connecting?
- Check PostgreSQL is running on port 5432
- Verify database `telusko2` exists
- Confirm credentials in `application.properties`
- Ensure backend is running on port 8080

### Frontend can't fetch products?
- Ensure backend is running on port 8080
- Check `constants.js` has correct API_BASE_URL
- Verify CORS is enabled in backend

### Can't add products?
- Make sure you're logged in as admin
- Check browser console for errors
- Verify form validation passes

### Products not loading from database?
- Check `data.sql` was executed
- Restart backend to reload data
- Query database: `SELECT COUNT(*) FROM product;`

## 📂 Key Files

### Frontend:
- `src/Context/AuthContext.jsx` - Authentication logic
- `src/components/Login.jsx` - Login page
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/components/Navbar.jsx` - Navigation with admin controls
- `src/config/constants.js` - API configuration

### Backend:
- `src/main/resources/application.properties` - Server config
- `src/main/resources/data.sql` - Sample products
- `src/main/java/.../config/SecurityConfig.java` - Security setup

## 🎨 Theme Colors

- **Primary Gradient**: #667eea → #764ba2
- **Success**: #16a34a (green)
- **Error**: #ef4444 (red)
- **Warning**: #f59e0b (orange)
- **Info**: #3b82f6 (blue)
