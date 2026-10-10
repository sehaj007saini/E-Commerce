# 🚀 How to Run the E-Commerce Project

## Quick Start (Automated)

### Option 1: Use the Startup Script (Easiest)

```powershell
cd F:\SummerProject
.\RUN_PROJECT.ps1
```

This will automatically:
- ✅ Check PostgreSQL status
- ✅ Open IntelliJ IDEA with backend project
- ✅ Open VS Code with frontend project  
- ✅ Open browser to http://localhost:5173

---

## Manual Start (Step by Step)

### Step 1: Start PostgreSQL

**Option A - Using Script:**
```powershell
# Run PowerShell as Administrator
Start-Service -Name "postgresql-x64-18"
```

**Option B - Using Services:**
1. Press `Windows + R`
2. Type: `services.msc`
3. Find "postgresql-x64-18"
4. Right-click → Start

---

### Step 2: Start Backend (Spring Boot)

1. **Open IntelliJ IDEA**
2. **Open Project:** `F:\SummerProject\SpringEcom`
3. **Click** the green Run button (▶) or press `Shift + F10`
4. **Wait for:** "Started SpringEcomApplication in X seconds"
5. **Backend URL:** http://localhost:8080

**Troubleshooting:**
- If PostgreSQL connection error: Check PostgreSQL is running
- If port 8080 busy: Stop other Java applications

---

### Step 3: Start Frontend (React + Vite)

1. **Open VS Code**
2. **Open Folder:** `F:\SummerProject\ecom-frontend-5-main\ecom-frontend-5-main`
3. **Open Terminal:** Press `` Ctrl + ` ``
4. **Run Command:**
   ```bash
   npm run dev
   ```
5. **Wait for:** "Local: http://localhost:5173"
6. **Frontend URL:** http://localhost:5173

**First Time Setup:**
If `npm run dev` fails, install dependencies first:
```bash
npm install
npm run dev
```

---

### Step 4: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

---

## 🔐 Login Credentials

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Access:** Full admin dashboard, product management, order management

### Regular User Account
- **Username:** `user`
- **Password:** `user123`
- **Access:** Shopping, cart, order history, wishlist

---

## 🎯 Testing the Application

### As a Customer:
1. Browse products on homepage
2. Search for products (e.g., "laptop")
3. Add products to cart
4. Use chatbot (click robot icon)
5. Checkout and place order
6. View order history

### As Admin:
1. Login with admin credentials
2. Click "Admin Dashboard"
3. Add/Edit/Delete products
4. View all orders
5. Update order status
6. Manage coupons

---

## 📊 Service Status Check

### Check if Everything is Running:

**PostgreSQL:**
```powershell
Get-Service -Name "postgresql-x64-18"
```

**Backend (Check port 8080):**
```powershell
Test-NetConnection -ComputerName localhost -Port 8080
```

**Frontend (Check port 5173):**
```powershell
Test-NetConnection -ComputerName localhost -Port 5173
```

---

## 🐛 Common Issues & Solutions

### Issue 1: PostgreSQL Not Running
**Error:** `Connection to localhost:5432 refused`

**Solution:**
```powershell
# Run as Administrator
Start-Service -Name "postgresql-x64-18"
```

---

### Issue 2: Port 8080 Already in Use
**Error:** `Port 8080 is already in use`

**Solution:**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

---

### Issue 3: Frontend Won't Start
**Error:** `npm command not found`

**Solution:**
- Install Node.js from https://nodejs.org
- Restart terminal after installation

---

### Issue 4: Database Connection Failed
**Error:** `Authentication failed for user postgres`

**Solution:**
- Check `application.properties` has correct password
- Current password: `laknight07`

---

## 📁 Project Structure

```
F:\SummerProject\
├── SpringEcom/              ← Backend (Open in IntelliJ)
│   └── src/main/java/...
├── ecom-frontend-5-main/
│   └── ecom-frontend-5-main/ ← Frontend (Open in VS Code)
│       └── src/...
└── RUN_PROJECT.ps1          ← Startup script
```

---

## 🎓 For Viva Demo

### Preparation Checklist:
- [ ] PostgreSQL running
- [ ] Backend started (IntelliJ)
- [ ] Frontend started (VS Code)
- [ ] Browser open to http://localhost:5173
- [ ] Test login with admin account
- [ ] Test adding product to cart
- [ ] Test checkout flow
- [ ] Test chatbot

### Demo Flow:
1. **Homepage:** Show product catalog
2. **Search:** Search for "laptop"
3. **Product Detail:** Click on a product
4. **Cart:** Add to cart, update quantity
5. **Chatbot:** Ask "show me cheap laptops"
6. **Checkout:** Place an order
7. **Order History:** Show order created
8. **Admin Dashboard:** Login as admin, show order management

---

## 🌐 API Endpoints (For Testing)

### Public Endpoints:
```
GET  http://localhost:8080/api/products
GET  http://localhost:8080/api/products/{id}
GET  http://localhost:8080/api/products/search?keyword=laptop
POST http://localhost:8080/api/chat
```

### Admin Endpoints (Requires Authentication):
```
POST   http://localhost:8080/api/products
PUT    http://localhost:8080/api/products/{id}
DELETE http://localhost:8080/api/products/{id}
GET    http://localhost:8080/api/orders
```

---

## 🛠️ Development Tools

- **Backend IDE:** IntelliJ IDEA 2026.1.3
- **Frontend IDE:** Visual Studio Code
- **Database:** PostgreSQL 18
- **API Testing:** Use browser or Postman
- **Browser:** Chrome recommended

---

## 📞 Quick Reference

| Service | URL | Status Check |
|---------|-----|--------------|
| Frontend | http://localhost:5173 | Open in browser |
| Backend API | http://localhost:8080 | http://localhost:8080/api/products |
| PostgreSQL | localhost:5432 | `Get-Service postgresql-x64-18` |

---

## ✅ Success Indicators

**Backend Started Successfully:**
```
Started SpringEcomApplication in X.XXX seconds
Tomcat started on port(s): 8080
```

**Frontend Started Successfully:**
```
VITE v5.x.x  ready in XXX ms
➜ Local:   http://localhost:5173/
```

**PostgreSQL Running:**
```
postgresql-x64-18    Running
```

---

**Good luck with your viva! 🚀**
