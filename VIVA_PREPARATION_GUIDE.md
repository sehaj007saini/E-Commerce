# 🎓 E-Commerce Platform - Viva Preparation Guide

## 📚 Project Overview (30 seconds elevator pitch)

**"I developed a full-stack e-commerce platform where customers can browse products, add them to cart, place orders, and track their deliveries. Admins can manage products, orders, and view analytics. The backend is built with Spring Boot and PostgreSQL, while the frontend uses React. It includes features like an AI shopping assistant chatbot, coupon system, wishlist, and product reviews."**

---

## 🏗️ System Architecture

### **Three-Tier Architecture:**

```
┌─────────────────────┐
│   FRONTEND LAYER    │  React (Port 5173)
│  (Presentation)     │  - User Interface
└──────────┬──────────┘  - Client-side logic
           │
           │ HTTP/REST API
           │
┌──────────▼──────────┐
│   BACKEND LAYER     │  Spring Boot (Port 8080)
│  (Business Logic)   │  - REST Controllers
└──────────┬──────────┘  - Business Services
           │
           │ JDBC/JPA
           │
┌──────────▼──────────┐
│   DATABASE LAYER    │  PostgreSQL (Port 5432)
│   (Data Storage)    │  - Product data
└─────────────────────┘  - Order data
                         - User data
```

---

## 💻 Technology Stack (Be Ready to Explain Each)

### **Backend:**
1. **Spring Boot 4.1.0** - Java framework for building REST APIs
2. **Java 25** - Programming language
3. **PostgreSQL 18** - Relational database
4. **Hibernate/JPA** - ORM for database operations
5. **Spring Security** - Authentication and authorization
6. **Maven** - Dependency management

### **Frontend:**
1. **React 18** - JavaScript library for building UI
2. **Vite** - Fast build tool
3. **React Router v6** - Client-side routing
4. **Axios** - HTTP client for API calls
5. **Bootstrap 5** - CSS framework
6. **Context API** - State management

---

## 🎯 Key Features (Explain in Detail)

### **1. Product Management**

**How it works:**
- **Browse Products:** Users see products on home page
- **Search:** Real-time search by product name/description
- **Filter:** By category (Laptop, Mobile, Electronics, etc.)
- **Sort:** By price, name, rating

**Technical Implementation:**
```java
// Backend: ProductController.java
@GetMapping("/products")
public List<Product> getAllProducts()

@GetMapping("/products/search")
public List<Product> searchProducts(@RequestParam String keyword)
```

**Database Table:**
```sql
Products Table:
- id (Primary Key)
- name
- brand
- description
- price
- category
- stock_quantity
- product_available (boolean)
- image_name
- image_type
- image_data (bytea)
```

---

### **2. Shopping Cart**

**How it works:**
- Users add products to cart
- Can increase/decrease quantity
- Real-time price calculation
- Cart persists using Context API

**Technical Implementation:**
```javascript
// Frontend: Context.jsx
const [cart, setCart] = useState([]);

const addToCart = (product) => {
  setCart([...cart, {...product, quantity: 1}]);
};
```

**Flow:**
1. User clicks "Add to Cart"
2. Product stored in React Context
3. Cart icon shows item count
4. Cart page displays all items
5. Total price calculated client-side

---

### **3. Order Management**

**How it works:**
- User checks out with cart items
- Backend creates order and reduces stock
- Order gets unique Order ID (e.g., ORD4A3B2C1D)
- User can track order status

**Technical Implementation:**
```java
// Backend: OrderService.java
public OrderResponse placeOrder(OrderRequest request) {
    1. Generate unique Order ID
    2. Validate stock availability
    3. Reduce product stock quantity
    4. Create Order entity
    5. Create OrderItem entities
    6. Save to database
    7. Return Order ID
}
```

**Database Tables:**
```sql
Orders Table:
- id
- order_id (unique)
- customer_name
- email
- status (PLACED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- order_date

Order_Items Table:
- id
- order_id (Foreign Key)
- product_id (Foreign Key)
- quantity
- total_price
```

**Order Status Flow:**
```
PLACED → PROCESSING → SHIPPED → DELIVERED
   ↓
CANCELLED (only from PLACED status)
```

---

### **4. Authentication & Authorization**

**How it works:**
- Two types of users: Regular Users & Admins
- Login system with role-based access
- Admin-only routes protected

**Technical Implementation:**
```java
// Backend: SecurityConfig.java
.requestMatchers(HttpMethod.GET, "/api/products").permitAll()
.requestMatchers(HttpMethod.POST, "/api/product").hasRole("ADMIN")
.requestMatchers(HttpMethod.PUT, "/api/product/**").hasRole("ADMIN")
```

**User Types:**
| Feature | Regular User | Admin |
|---------|-------------|-------|
| Browse Products | ✅ | ✅ |
| Add to Cart | ✅ | ✅ |
| Place Orders | ✅ | ✅ |
| View Own Orders | ✅ | ✅ |
| Add/Edit Products | ❌ | ✅ |
| View All Orders | ❌ | ✅ |
| Dashboard | ❌ | ✅ |

---

### **5. AI Shopping Assistant (Chatbot)**

**How it works:**
- Rule-based chatbot (not real AI like ChatGPT)
- Matches user queries with predefined patterns
- Provides product recommendations

**Technical Implementation:**
```java
// Backend: ChatbotService.java
public String processMessage(String userMessage) {
    1. Convert message to lowercase
    2. Check for keywords:
       - "cheap", "under" → Return products under $500
       - "laptop" → Return laptop category products
       - "coupon" → Return active coupons
    3. Return formatted response
}
```

**Example Queries:**
- "Show me cheap laptops" → Products < $500
- "What coupons do you have?" → Active coupon codes
- "Track my order" → Order tracking info

---

### **6. Coupon System**

**How it works:**
- Users enter coupon code at checkout
- Backend validates coupon
- Discount applied to total price

**Coupon Types:**
1. **Percentage Discount** (e.g., WELCOME10 = 10% off)
2. **Flat Discount** (e.g., FLAT50 = $50 off)

**Technical Implementation:**
```java
// Backend: CouponController.java
@PostMapping("/coupons/validate")
public Map<String, Object> validateCoupon(@RequestBody Map<String, String> request) {
    1. Check if coupon exists
    2. Check if coupon is active
    3. Check expiry date
    4. Return discount details
}
```

---

### **7. Product Reviews & Ratings**

**How it works:**
- Users can rate products (1-5 stars)
- Write review comments
- Reviews displayed on product page

**Database Table:**
```sql
Reviews Table:
- id
- product_id (Foreign Key)
- user_name
- rating (1-5)
- comment
- review_date
```

---

### **8. Wishlist**

**How it works:**
- Users save products for later
- Stored in React Context
- Persists during session

**Technical Implementation:**
```javascript
// Frontend: Context.jsx
const [wishlist, setWishlist] = useState([]);

const addToWishlist = (product) => {
  setWishlist([...wishlist, product]);
};
```

---

## 🔄 Complete User Flow (Explain This Step by Step)

### **Customer Journey:**

```
1. USER VISITS WEBSITE
   ↓
2. BROWSE PRODUCTS (Home Page)
   - View featured products
   - Use search/filter
   ↓
3. VIEW PRODUCT DETAILS
   - Click on product
   - See price, description, reviews
   ↓
4. ADD TO CART
   - Product added to cart
   - Can continue shopping
   ↓
5. GO TO CART
   - Review items
   - Update quantities
   - Remove items
   ↓
6. CHECKOUT
   - Enter customer details
   - Apply coupon code
   - See order summary
   ↓
7. PLACE ORDER
   - Backend creates order
   - Stock reduced
   - Order ID generated
   ↓
8. VIEW ORDERS
   - Track order status
   - See order history
```

---

## 🔐 Security Features

### **1. Spring Security Configuration**
```java
// SecurityConfig.java
- CSRF protection disabled (for REST API)
- CORS enabled
- Public endpoints: /api/products, /api/auth/**
- Protected endpoints: /api/product (POST/PUT/DELETE) - Admin only
```

### **2. Password Security**
- Passwords stored with {noop} prefix (plain text in this version)
- **Improvement suggestion**: Use BCrypt password encoding

### **3. SQL Injection Prevention**
- Using JPA/Hibernate with parameterized queries
- No raw SQL with user input

### **4. Input Validation**
```java
// Using Bean Validation
@NotBlank(message = "Product name is required")
@Min(value = 0, message = "Price must be positive")
```

---

## 💾 Database Schema

### **Main Tables:**

```sql
1. PRODUCT
   - Stores product information
   - Includes image as BYTEA

2. USERS
   - Customer information
   - Role (USER/ADMIN)

3. ORDERS
   - Order header information
   - Links to customer

4. ORDER_ITEMS
   - Order line items
   - Links orders to products

5. REVIEWS
   - Product reviews and ratings

6. COUPONS
   - Discount codes
```

### **Relationships:**
```
PRODUCT ←──┐
           │
ORDER ────→ ORDER_ITEMS ───→ PRODUCT
  │
  └────→ USER

PRODUCT ←── REVIEWS
```

---

## 📡 REST API Design

### **RESTful Principles:**

| HTTP Method | URL | Purpose | Access |
|-------------|-----|---------|--------|
| GET | /api/products | Get all products | Public |
| GET | /api/products/{id} | Get one product | Public |
| POST | /api/products | Create product | Admin |
| PUT | /api/products/{id} | Update product | Admin |
| DELETE | /api/products/{id} | Delete product | Admin |
| POST | /api/orders/place | Create order | Public |
| GET | /api/orders | Get all orders | Admin |
| GET | /api/orders/user/{email} | Get user orders | User |

### **Response Format:**
```json
// Success Response
{
  "id": 1,
  "name": "iPhone 14",
  "price": 999.99,
  "category": "Mobile",
  "stockQuantity": 50
}

// Error Response
{
  "error": "Product not found",
  "status": 404,
  "timestamp": "2026-08-17T10:30:00"
}
```

---

## 🎨 Frontend Architecture

### **Component Structure:**
```
App.jsx (Root)
├── Navbar
├── Routes
│   ├── Home
│   │   ├── Hero
│   │   ├── FeaturedProducts
│   │   └── ProductCard
│   ├── Product (Detail Page)
│   │   └── ProductReviews
│   ├── Cart
│   │   └── CheckoutPopup
│   ├── Wishlist
│   ├── OrderHistory
│   ├── Login
│   ├── Register
│   └── AdminDashboard
└── Footer
```

### **State Management:**
```javascript
// Context API Structure
AppContext:
  - cart: []
  - wishlist: []
  - addToCart()
  - removeFromCart()

AuthContext:
  - user: {username, email, role}
  - isAdmin: boolean
  - login()
  - logout()
```

---

## 🔧 Configuration Files

### **application.properties (Backend):**
```properties
# Database Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/telusko2
spring.datasource.username=postgres

# JPA Settings
spring.jpa.hibernate.ddl-auto=update (auto-create tables)
spring.sql.init.mode=always (run data.sql on startup)

# File Upload
spring.servlet.multipart.max-file-size=10MB
```

### **package.json (Frontend):**
```json
"dependencies": {
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.0.0",
  "bootstrap": "^5.0.0"
}
```

---

## 🚀 How to Run (Demo for Viva)

### **1. Start PostgreSQL**
```bash
# Check if running:
pg_ctl status

# If not, start it:
pg_ctl start
```

### **2. Start Backend**
```bash
cd SpringEcom
./mvnw spring-boot:run

# Wait for: "Started SpringEcomApplication in X seconds"
```

### **3. Start Frontend**
```bash
cd ecom-frontend-5-main/ecom-frontend-5-main
npm run dev

# Opens at: http://localhost:5173
```

---

## 📊 Performance Optimizations

1. **Database Indexing:**
   - Primary keys auto-indexed
   - Foreign keys indexed for faster joins

2. **Image Storage:**
   - Images stored as BYTEA in database
   - **Alternative**: Could store on file system/cloud (S3)

3. **Lazy Loading:**
   - JPA lazy loading for relationships
   - Only load data when needed

4. **Pagination:**
   - Could add for product lists (future enhancement)

---

## 🐛 Error Handling

### **Backend:**
```java
// Global Exception Handler
@ControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    return ResponseEntity.status(404).body(error);
    
    @ExceptionHandler(InsufficientStockException.class)
    return ResponseEntity.status(400).body(error);
}
```

### **Frontend:**
```javascript
// Axios error handling
try {
  const response = await API.get('/products');
} catch (error) {
  if (error.response.status === 404) {
    showToast('Product not found', 'error');
  }
}
```

---

## 🔜 Future Enhancements (Be Ready to Discuss)

1. **Payment Gateway Integration**
   - Stripe or PayPal
   - Secure card processing

2. **Real AI Chatbot**
   - Integrate ChatGPT/Claude API
   - Natural language processing

3. **Email Notifications**
   - Order confirmation
   - Shipping updates
   - Password reset

4. **JWT Token Authentication**
   - Replace current session-based auth
   - Stateless authentication

5. **Product Recommendations**
   - Based on browsing history
   - Machine learning algorithms

6. **Admin Analytics**
   - Sales graphs
   - Revenue reports
   - Top-selling products

---

## 💡 Common Viva Questions & Answers

### Q1: **Why did you choose Spring Boot?**
**A:** Spring Boot provides:
- Built-in dependency injection
- Easy REST API creation with @RestController
- Auto-configuration (less XML configuration)
- Embedded Tomcat server
- Spring Security for authentication
- Strong community and documentation

### Q2: **Why PostgreSQL over MySQL?**
**A:** PostgreSQL offers:
- Better support for complex queries
- ACID compliance
- JSON support (JSONB)
- Better for data integrity
- Open-source and free

### Q3: **What is JPA/Hibernate?**
**A:** 
- JPA (Java Persistence API) - Specification for ORM
- Hibernate - Implementation of JPA
- Maps Java objects to database tables
- Reduces boilerplate JDBC code
- Example: `@Entity` class becomes a table

### Q4: **Explain MVC architecture in your project**
**A:**
- **Model:** Entity classes (Product, Order, User)
- **View:** React frontend (separate from backend)
- **Controller:** REST Controllers handle HTTP requests

### Q5: **How does React Context API work?**
**A:**
- Creates global state accessible to all components
- Avoids prop drilling (passing props through many levels)
- Example: Cart data accessible from any component
- Provider wraps app, Consumer components access data

### Q6: **What is CORS and why did you enable it?**
**A:**
- CORS = Cross-Origin Resource Sharing
- Frontend (port 5173) and Backend (port 8080) are different origins
- Browser blocks cross-origin requests by default
- Spring Security CORS configuration allows frontend to call backend

### Q7: **How do you handle file uploads (product images)?**
**A:**
- Frontend: `multipart/form-data` form submission
- Backend: `@RequestParam MultipartFile`
- Store as BYTEA (byte array) in PostgreSQL
- Retrieve: `@GetMapping("/product/{id}/image")`

### Q8: **Explain your order placement workflow**
**A:**
1. User clicks "Place Order"
2. Frontend sends POST to `/api/orders/place`
3. Backend validates stock availability
4. Creates Order and OrderItems
5. Reduces product stock
6. Returns Order ID
7. Frontend redirects to Orders page

### Q9: **What is the difference between @RestController and @Controller?**
**A:**
- `@RestController` = `@Controller` + `@ResponseBody`
- Returns JSON data directly
- Used for REST APIs
- `@Controller` returns view names (JSP/Thymeleaf)

### Q10: **How did you implement authentication?**
**A:**
- Spring Security with HTTP Basic Auth
- In-memory user for admin
- Database users for customers
- Role-based access control (ROLE_ADMIN, ROLE_USER)
- Frontend stores user in Context API

---

## 🎯 Project Statistics (Good to Know)

- **Lines of Code:** ~5,000+ (Frontend + Backend)
- **Number of API Endpoints:** 20+
- **Number of React Components:** 25+
- **Database Tables:** 6
- **Features Implemented:** 12 major features
- **Development Time:** Summer training period

---

## 📝 Key Takeaways for Viva

### **What You Built:**
Full-stack e-commerce platform with product browsing, cart, orders, admin panel, and AI chatbot.

### **Technologies Mastered:**
Spring Boot, React, PostgreSQL, REST APIs, JPA/Hibernate, Spring Security

### **Problem Solved:**
Created a complete online shopping experience from product discovery to order tracking.

### **Challenges Overcome:**
- User authentication and authorization
- Order management with stock tracking
- Image storage and retrieval
- State management in React
- Database relationships

### **What You Learned:**
- Full-stack development workflow
- REST API design principles
- Database design and normalization
- Frontend-backend integration
- Security best practices

---

## 🎤 Final Tips for Viva

1. **Be Confident:** You built this project, you understand it!
2. **Explain Simply:** Use analogies (e.g., "Cart is like a shopping basket")
3. **Show Demo:** Be ready to demonstrate features live
4. **Admit Limitations:** It's okay to say "This could be improved by..."
5. **Know Your Code:** Be ready to explain any file they ask about
6. **Practice:** Run through this guide 2-3 times before viva

---

**Good Luck! You've got this! 🚀**
