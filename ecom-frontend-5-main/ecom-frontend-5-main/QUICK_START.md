# Quick Start Guide - E-Commerce Frontend

Get the frontend up and running in 5 minutes!

## Prerequisites Check

Before you begin, ensure you have:
- ✅ Node.js v16 or higher installed
- ✅ npm or yarn package manager
- ✅ Backend API running on `http://localhost:8080`

**Check Node.js version:**
```bash
node --version
# Should output v16.x.x or higher
```

## 🚀 Installation Steps

### 1. Navigate to Frontend Directory
```bash
cd ecom-frontend-5-main/ecom-frontend-5-main
```

### 2. Install Dependencies
```bash
npm install
```
This will install all required packages including React, Vite, Bootstrap, and Axios.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to: **http://localhost:5173**

You should see the product listing page!

## 🎉 That's It!

You're now running the e-commerce frontend.

---

## 🔧 Optional Configuration

### Change API URL (If backend is on different port)

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:YOUR_PORT/api
```

3. Restart dev server:
```bash
npm run dev
```

---

## 🧪 Test the Application

### 1. View Products
- Home page should show all products
- Click on any product to see details

### 2. Add Product
- Click "Add Product" in navbar
- Fill in the form
- Upload an image
- Submit

### 3. Shopping Cart
- Click "Add to Cart" on any product
- Click cart icon in navbar
- Adjust quantities
- Proceed to checkout

### 4. Category Filter
- Use category dropdown in navbar
- Products will filter by category

---

## 🐛 Troubleshooting

### Problem: `npm install` fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force
# Try again
npm install
```

### Problem: Cannot connect to backend
**Solution:**
1. Verify backend is running:
   ```bash
   curl http://localhost:8080/api/products
   ```
2. If not running, start backend first
3. Check console for CORS errors

### Problem: Port 5173 already in use
**Solution:**
```bash
# Vite will automatically use next available port
# Or specify custom port:
npm run dev -- --port 3000
```

### Problem: Images not loading
**Solution:**
1. Check backend is serving images correctly
2. Open browser DevTools (F12)
3. Check Network tab for failed requests
4. Verify image endpoint: `http://localhost:8080/api/product/{id}/image`

### Problem: Changes not reflecting
**Solution:**
```bash
# Stop server (Ctrl+C)
# Clear browser cache
# Restart server
npm run dev
```

---

## 📝 Next Steps

1. **Read Documentation**
   - [README.md](./README.md) - Full documentation
   - [FRONTEND_IMPROVEMENTS.md](./FRONTEND_IMPROVEMENTS.md) - What's new

2. **Explore Features**
   - Add products
   - Manage cart
   - Test validation
   - Try error scenarios

3. **Backend Integration**
   - Read backend API docs: `../../SpringEcom/README_API.md`
   - Test all endpoints

4. **Customize**
   - Modify colors in CSS
   - Add new features
   - Enhance UI/UX

---

## 🎯 Common Tasks

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Clear LocalStorage (Reset Cart)
Open browser console and run:
```javascript
localStorage.clear()
```

---

## 📞 Need Help?

- Check [README.md](./README.md) for detailed documentation
- Check [FRONTEND_IMPROVEMENTS.md](./FRONTEND_IMPROVEMENTS.md) for features
- Review browser console for errors
- Check backend logs

---

## ✨ Pro Tips

1. **Keep Backend Running**: Always ensure backend is running before starting frontend
2. **Browser DevTools**: Press F12 to see console logs and network requests
3. **Hot Reload**: Changes to code auto-reload in browser
4. **LocalStorage**: Cart data persists in browser localStorage
5. **Validation**: Form validation happens before API calls

---

**Happy Coding! 🚀**
