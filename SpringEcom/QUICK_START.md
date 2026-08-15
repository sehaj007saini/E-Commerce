# 🚀 Quick Start Guide

Get your Spring E-Commerce backend running in 5 minutes!

## IntelliJ IDEA (Recommended)

1. Open the **`SpringEcom`** folder in IntelliJ IDEA
2. Copy `application-local.properties.example` → `application-local.properties` and set your PostgreSQL password
3. Select run configuration **`SpringEcom`** from the top toolbar
4. Click **Run** ▶

Uses PostgreSQL at `localhost:5432/telusko2`.

API: http://localhost:8080/api/products

See **`../RUN.md`** for full backend + frontend instructions.

---

## Prerequisites Check

```bash
# Check Java version (need 21+)
java -version

# Check PostgreSQL (need 12+)
psql --version

# Check if PostgreSQL is running
pg_isready
```

## Step-by-Step Setup

### 1️⃣ Database Setup (2 minutes)

```bash
# Start PostgreSQL (if not running)
# Windows: Use Services or pg_ctl
# Mac/Linux: sudo service postgresql start

# Create database
psql -U postgres
```

```sql
CREATE DATABASE telusko2;
\q
```

### 2️⃣ Configure Environment (1 minute)

**Option A: Environment Variables (Recommended)**
```bash
# Windows PowerShell
$env:DB_URL="jdbc:postgresql://localhost:5432/telusko2"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_password"

# Windows CMD
set DB_URL=jdbc:postgresql://localhost:5432/telusko2
set DB_USERNAME=postgres
set DB_PASSWORD=your_password

# Mac/Linux
export DB_URL=jdbc:postgresql://localhost:5432/telusko2
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
```

**Option B: Create .env file**
```bash
# Copy example file
cp .env.example .env

# Edit .env with your credentials
# (Use any text editor)
```

### 3️⃣ Run the Application (2 minutes)

```bash
# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or if Maven is installed
mvn spring-boot:run
```

Wait for:
```
Started SpringEcomApplication in X seconds
```

### 4️⃣ Verify It's Working

Open browser or use curl:
```bash
curl http://localhost:8080/api/products
```

Expected response: `[]` (empty array)

## First Actions

### Add Your First Product

```bash
curl -X POST http://localhost:8080/api/product \
  -F 'product={"name":"Gaming Laptop","brand":"TechCorp","price":1500,"category":"Electronics","stockQuantity":10,"productAvailable":true};type=application/json'
```

### View Products

```bash
curl http://localhost:8080/api/products
```

### Place an Order

```bash
curl -X POST http://localhost:8080/api/orders/place \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "email": "test@example.com",
    "items": [{"productId": 1, "quantity": 1}]
  }'
```

## Common Issues & Quick Fixes

### ❌ Port 8080 already in use
**Fix:** Change port in `application.properties`
```properties
server.port=8081
```

### ❌ Database connection refused
**Fix:** Check PostgreSQL is running
```bash
# Windows
pg_isready

# Start if not running
pg_ctl -D "C:\Program Files\PostgreSQL\XX\data" start
```

### ❌ Authentication failed for user
**Fix:** Verify your password
```bash
psql -U postgres -d telusko2
# Enter password when prompted
```

### ❌ Maven not found
**Fix:** Use Maven wrapper instead
```bash
# Instead of: mvn spring-boot:run
# Use: ./mvnw spring-boot:run

# Windows: .\mvnw.cmd spring-boot:run
```

## Next Steps

1. **Read API Documentation:** See `README_API.md` for all endpoints
2. **Test with Postman:** Import requests from `test-requests.http`
3. **Check Full Setup Guide:** See `SETUP.md` for advanced configuration
4. **Review Improvements:** See `IMPROVEMENTS.md` for all new features

## Quick Reference

| Action | Command |
|--------|---------|
| Run app | `./mvnw spring-boot:run` |
| Build | `./mvnw clean package` |
| Test | `./mvnw test` |
| Stop app | `Ctrl + C` |

| Endpoint | URL |
|----------|-----|
| Products | http://localhost:8080/api/products |
| Orders | http://localhost:8080/api/orders |
| Search | http://localhost:8080/api/products/search?keyword=... |

## Development Tips

### Enable Hot Reload
Add to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
```

### View SQL Queries
Set in `application.properties`:
```properties
spring.jpa.show-sql=true
```

### Check Application Health
```bash
curl http://localhost:8080/actuator/health
```
(Requires actuator dependency)

## Project Structure Quick View

```
src/main/java/com/telusko/SpringEcom/
├── controller/         → REST APIs (ProductController, OrderController)
├── service/           → Business logic (ProductService, OrderService)
├── repo/              → Database access (ProductRepo, OrderRepo)
├── model/             → Entities (Product, Order, OrderItem)
│   └── dto/           → DTOs (OrderRequest, OrderResponse, etc.)
├── exception/         → Error handling (GlobalExceptionHandler)
└── SpringEcomApplication.java → Main application class
```

## Need Help?

- 📚 **Full Documentation:** `README.md`
- 🔧 **Detailed Setup:** `SETUP.md`
- 📡 **API Reference:** `README_API.md`
- ✨ **What's New:** `IMPROVEMENTS.md`
- 🧪 **Test Requests:** `test-requests.http`

## Success Checklist

- [ ] Java 21+ installed
- [ ] PostgreSQL running
- [ ] Database created
- [ ] Environment variables set
- [ ] Application started
- [ ] Can access http://localhost:8080/api/products
- [ ] Can add a product
- [ ] Can place an order

**All checked?** You're ready to develop! 🎉
