# 📁 E-Commerce Project - Complete File Structure Explanation

## 🎯 For Viva: Understanding Every File

---

## 📂 Project Root Structure

```
F:\SummerProject\
├── SpringEcom/           (Backend - Spring Boot)
├── ecom-frontend-5-main/ (Frontend - React)
├── README.md             (Project documentation)
├── VIVA_PREPARATION_GUIDE.md
└── CHATBOT_EXPLANATION.md
```

---

# 🔧 BACKEND (SpringEcom/) - Spring Boot

## 📁 src/main/java/com/telusko/SpringEcom/

### **1. SpringEcomApplication.java** (Main Entry Point)
```java
@SpringBootApplication
public class SpringEcomApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringEcomApplication.class, args);
    }
}
```
**Purpose:** 
- Starting point of the entire Spring Boot application
- Launches embedded Tomcat server on port 8080
- Scans and initializes all Spring components
- Like pressing the "Start" button for your backend

**For Viva:** "This is the main class that starts our Spring Boot application. When we run this file, it initializes all controllers, services, and connects to the database."

---

## 📁 controller/ (REST API Endpoints)

### **2. ProductController.java**
**Purpose:** Handles all product-related HTTP requests

**Key Endpoints:**
```java
@GetMapping("/products")               // Get all products
@GetMapping("/products/{id}")          // Get product by ID
@GetMapping("/products/search")        // Search products by keyword
@PostMapping("/products")              // Add new product (Admin only)
@PutMapping("/products/{id}")          // Update product (Admin only)
@DeleteMapping("/products/{id}")       // Delete product (Admin only)
@GetMapping("/product/{id}/image")     // Get product image
```

**For Viva:** "This controller exposes REST APIs for product operations. When frontend needs product data, it calls these endpoints. For example, GET /products returns all products as JSON."

---

### **3. OrderController.java**
**Purpose:** Manages order operations

**Key Endpoints:**
```java
@PostMapping("/orders/place")          // Place new order
@GetMapping("/orders")                 // Get all orders (Admin)
@GetMapping("/orders/user/{email}")    // Get user's orders
@PutMapping("/orders/{id}/status")     // Update order status (Admin)
```

**For Viva:** "This handles the checkout process. When a user places an order, this controller receives cart items, creates order records, reduces stock, and returns an order ID."

---

### **4. AuthController.java**
**Purpose:** User authentication

**Key Endpoints:**
```java
@PostMapping("/auth/login")            // User login
@PostMapping("/auth/register")         // User registration
```

**For Viva:** "Handles user login and registration. It validates credentials and returns user information with role (USER or ADMIN)."

---

### **5. ChatbotController.java**
**Purpose:** AI chatbot endpoints

**Key Endpoint:**
```java
@PostMapping("/chat")                  // Process chatbot messages
```

**For Viva:** "This receives user messages, processes them through our rule-based chatbot service, and returns product recommendations or information."

---

### **6. CouponController.java**
**Purpose:** Discount coupon management

**Key Endpoints:**
```java
@GetMapping("/coupons")                // Get all coupons
@PostMapping("/coupons/validate")      // Validate coupon code
@PostMapping("/coupons")               // Create coupon (Admin)
```

---

### **7. ReviewController.java**
**Purpose:** Product reviews and ratings

**Key Endpoints:**
```java
@PostMapping("/reviews")               // Add review
@GetMapping("/products/{id}/reviews")  // Get product reviews
```

---

## 📁 service/ (Business Logic)

### **8. ProductService.java**
**Purpose:** Product business logic

**Key Methods:**
```java
getAllProducts()           // Fetch all products from database
getProductById(id)         // Get single product
addProduct(product)        // Add new product
updateProduct(id, product) // Update existing product
deleteProduct(id)          // Delete product
searchProducts(keyword)    // Search by name/description/category
```

**For Viva:** "Service layer contains business logic. For example, when adding a product, this service validates data, processes the image, and saves to database using repository."

---

### **9. OrderService.java**
**Purpose:** Order processing logic

**Key Method:**
```java
placeOrder(OrderRequest request) {
    1. Generate unique Order ID (ORD + 8 random chars)
    2. Validate stock availability for each product
    3. Create Order entity
    4. Create OrderItem entities for each product
    5. Reduce product stock quantities
    6. Mark product as unavailable if stock = 0
    7. Save everything to database
    8. Return Order ID
}
```

**For Viva:** "This is the heart of checkout. It ensures we have enough stock, creates the order, reduces quantities, and returns confirmation."

---

### **10. AuthService.java**
**Purpose:** Authentication logic

**Key Methods:**
```java
login(username, password)      // Validate credentials
register(userDetails)          // Create new user
```

---

### **11. ChatbotService.java**
**Purpose:** Rule-based chatbot logic

**How It Works:**
```java
processChatMessage(message) {
    1. Convert message to lowercase
    2. Check for keywords:
       - "coupon"/"discount" → Return active coupons
       - "order"/"track" → Return tracking info
       - "return"/"refund" → Return return policy
       - "laptop"/"phone" → Search products
       - "under $500" → Filter by price
    3. Query database based on keywords
    4. Return formatted response with products
}
```

**For Viva:** "This is a pattern-matching system. It detects keywords like 'laptop under $500', extracts the price using regex, queries the database, and returns matching products. It's NOT using ChatGPT API - it's our own rule-based logic."

---

## 📁 model/ (Database Entities)

### **12. Product.java**
**Purpose:** Product table structure

**Fields:**
```java
@Entity
public class Product {
    @Id
    @GeneratedValue
    private int id;
    
    private String name;
    private String brand;
    private String description;
    private BigDecimal price;
    private String category;
    private int stockQuantity;
    private boolean productAvailable;
    
    @Lob  // Large Object for image storage
    private byte[] imageData;
    private String imageName;
    private String imageType;
}
```

**For Viva:** "This is a JPA entity that maps to the 'product' table in PostgreSQL. Each field becomes a column. @Id marks the primary key, @GeneratedValue auto-generates IDs."

---

### **13. Order.java**
**Purpose:** Order header information

**Fields:**
```java
@Entity
@Table(name = "orders")  // 'order' is reserved keyword in SQL
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(unique = true)
    private String orderId;  // ORD123ABC (user-facing ID)
    
    private String customerName;
    private String email;
    private String address;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status;  // PLACED, PROCESSING, SHIPPED, DELIVERED
    
    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;  // Items in this order
}
```

**For Viva:** "Order entity represents the order header. It has a one-to-many relationship with OrderItem - one order can have multiple items."

---

### **14. OrderItem.java**
**Purpose:** Individual items in an order

**Fields:**
```java
@Entity
public class OrderItem {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;  // Which order this belongs to
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;  // Which product
    
    private int quantity;
    private BigDecimal priceAtPurchase;  // Price when ordered
    private BigDecimal totalPrice;       // quantity × price
}
```

**For Viva:** "OrderItem is the line item. If you order 2 laptops and 1 phone, that's 2 OrderItems. It stores a snapshot of price at purchase time."

---

### **15. User.java**
**Purpose:** User accounts

**Fields:**
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(unique = true)
    private String username;
    
    @Column(unique = true)
    private String email;
    
    private String password;  // Should be encrypted with BCrypt
    
    private String role;  // "USER" or "ADMIN"
}
```

---

### **16. Coupon.java**
**Purpose:** Discount coupons

**Fields:**
```java
@Entity
public class Coupon {
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(unique = true)
    private String code;  // "WELCOME10"
    
    private String discountType;  // "PERCENTAGE" or "FLAT"
    private BigDecimal discountValue;  // 10 (for 10% or $10)
    private boolean isActive;
    private LocalDateTime expiryDate;
}
```

---

### **17. Review.java**
**Purpose:** Product reviews

**Fields:**
```java
@Entity
public class Review {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    
    private String userName;
    private int rating;  // 1-5 stars
    private String comment;
    private LocalDateTime reviewDate;
}
```

---

## 📁 repo/ (Database Access)

### **18. ProductRepo.java**
**Purpose:** Product database queries

```java
@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    // JpaRepository provides: findAll(), findById(), save(), delete()
    
    // Custom query methods:
    List<Product> findByCategory(String category);
    
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE %:keyword% OR " +
           "LOWER(p.description) LIKE %:keyword% OR " +
           "LOWER(p.category) LIKE %:keyword%")
    List<Product> searchProducts(@Param("keyword") String keyword);
}
```

**For Viva:** "Repository interfaces handle database operations. We extend JpaRepository which gives us free methods like findAll(), save(), delete(). We can also write custom queries using @Query annotation or method naming conventions."

---

### **19. OrderRepo.java**
```java
@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByEmail(String email);  // Get user's orders
    Optional<Order> findByOrderId(String orderId);  // Find by order ID
}
```

---

### **20. UserRepo.java**
```java
@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
```

**For Viva:** "Spring Data JPA automatically implements these methods based on naming conventions. findByEmail() automatically generates SQL: SELECT * FROM users WHERE email = ?"

---

## 📁 dto/ (Data Transfer Objects)

### **21. OrderRequest.java**
**Purpose:** Receives order data from frontend

```java
public class OrderRequest {
    private String customerName;
    private String email;
    private String address;
    private String phone;
    private List<OrderItemRequest> items;
    private String couponCode;  // Optional
}
```

**For Viva:** "DTOs transfer data between frontend and backend. OrderRequest doesn't map to a database table - it's just for receiving JSON data from the frontend."

---

### **22. OrderResponse.java**
**Purpose:** Sends order confirmation to frontend

```java
public class OrderResponse {
    private String orderId;
    private String message;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
}
```

---

### **23. ChatResponse.java**
```java
public class ChatResponse {
    private String reply;  // Bot's text message
    private List<RecommendedProduct> recommendedProducts;  // Product cards
    private List<String> suggestedQuestions;  // Quick reply buttons
}
```

---

## 📁 config/ (Configuration)

### **24. SecurityConfig.java**
**Purpose:** Security and authentication setup

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
            .csrf().disable()  // Disable CSRF for REST API
            .cors().and()      // Enable CORS for frontend
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/products").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic();  // Use HTTP Basic authentication
        
        return http.build();
    }
}
```

**For Viva:** "This configures Spring Security. It defines which endpoints are public (GET /products) and which need admin role (POST /products). CORS is enabled so our React frontend (port 5173) can call the backend (port 8080)."

---

### **25. WebConfig.java**
**Purpose:** CORS and web configuration

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173")  // React dev server
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

**For Viva:** "CORS (Cross-Origin Resource Sharing) allows frontend on port 5173 to make requests to backend on port 8080. Without this, browsers block cross-origin requests."

---

## 📁 src/main/resources/

### **26. application.properties**
**Purpose:** Application configuration

```properties
# Database Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/telusko2
spring.datasource.username=postgres
spring.datasource.password=laknight07

# JPA Settings
spring.jpa.hibernate.ddl-auto=update  # Auto-create/update tables
spring.jpa.show-sql=false              # Don't log SQL queries

# Server Port
server.port=8080
```

**For Viva:** "This is the main configuration file. It tells Spring Boot how to connect to PostgreSQL, what port to run on, and how to manage the database schema. hibernate.ddl-auto=update automatically creates tables from our entities."

---

### **27. data.sql** (Optional)
**Purpose:** Seed initial data

```sql
-- Insert sample products
INSERT INTO product (name, brand, price, category, stock_quantity, product_available)
VALUES ('iPhone 14', 'Apple', 999.99, 'Mobile', 50, true);

-- Insert admin user
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@ecom.com', '{noop}admin123', 'ADMIN');
```

**For Viva:** "This SQL file runs automatically when the application starts. We use it to insert sample products and create an admin user. {noop} means password is not encrypted (only for development)."

---

## 📁 pom.xml
**Purpose:** Maven configuration - manages dependencies

```xml
<dependencies>
    <!-- Spring Boot Web - REST API -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
    
    <!-- Spring Data JPA - Database ORM -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    
    <!-- Spring Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>
```

**For Viva:** "pom.xml is like package.json for Java. It lists all libraries our project needs. Maven automatically downloads them from the internet and adds to our project."

---

---

# 🎨 FRONTEND (ecom-frontend-5-main/) - React

## 📁 src/

### **28. main.jsx**
**Purpose:** Entry point for React app

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**For Viva:** "This is the starting point of React app. It finds the div with id='root' in index.html and renders our App component inside it."

---

### **29. App.jsx**
**Purpose:** Main component with routing

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Product from './components/Product'
import Cart from './components/Cart'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**For Viva:** "App.jsx sets up routing. When user navigates to /cart, React Router renders the Cart component. BrowserRouter enables client-side navigation without page reloads."

---

## 📁 src/components/

### **30. Home.jsx**
**Purpose:** Homepage - displays all products

```jsx
function Home() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products from backend
    API.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);
  
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**For Viva:** "Home component fetches products from backend using Axios, stores them in state using useState, and displays them in a grid. useEffect runs when component mounts - like componentDidMount in class components."

---

### **31. ProductCard.jsx**
**Purpose:** Single product card UI

```jsx
function ProductCard({ product }) {
  const { addToCart } = useContext(AppContext);
  
  return (
    <div className="product-card">
      <img src={`http://localhost:8080/api/product/${product.id}/image`} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
```

**For Viva:** "ProductCard is a reusable component. It receives product data as props and displays it. When user clicks 'Add to Cart', it calls addToCart function from Context API."

---

### **32. Product.jsx**
**Purpose:** Product detail page

```jsx
function Product() {
  const { id } = useParams();  // Get product ID from URL
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    API.get(`/products/${id}`)
      .then(response => setProduct(response.data));
  }, [id]);
  
  return (
    <div className="product-detail">
      <img src={product.imageUrl} />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
```

**For Viva:** "Product page shows full details. useParams hook extracts product ID from URL (e.g., /product/5 → id=5). It then fetches that specific product from backend."

---

### **33. Cart.jsx**
**Purpose:** Shopping cart

```jsx
function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);
  const navigate = useNavigate();
  
  const totalPrice = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  const handleCheckout = async () => {
    const orderData = {
      customerName: user.name,
      email: user.email,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };
    
    const response = await orderService.placeOrder(orderData);
    navigate('/orders');
  };
  
  return (
    <div className="cart">
      {cart.map(item => (
        <CartItem 
          key={item.id} 
          item={item}
          onRemove={() => removeFromCart(item.id)}
          onUpdateQty={(qty) => updateQuantity(item.id, qty)}
        />
      ))}
      <h2>Total: ${totalPrice}</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
```

**For Viva:** "Cart component displays cart items from Context. It calculates total price using reduce(). When user clicks Checkout, it sends order data to backend via orderService and navigates to orders page."

---

### **34. Navbar.jsx**
**Purpose:** Navigation bar

```jsx
function Navbar() {
  const { cart } = useContext(AppContext);
  const { user, logout } = useContext(AuthContext);
  
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/cart">
        Cart ({cart.length})
      </Link>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
```

**For Viva:** "Navbar shows cart item count and user info. It uses Context to access cart and user state. Link components from React Router enable navigation without page refresh."

---

### **35. Login.jsx**
**Purpose:** User login

```jsx
function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value
        })}
      />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### **36. AdminDashboard.jsx**
**Purpose:** Admin panel

```jsx
function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);
  
  const handleDeleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();  // Refresh list
  };
  
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <section>
        <h2>Manage Products</h2>
        <Link to="/admin/add-product">Add New Product</Link>
        <table>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </section>
      
      <section>
        <h2>Orders</h2>
        {/* Order management */}
      </section>
    </div>
  );
}
```

**For Viva:** "Admin dashboard shows all products and orders. Only users with ADMIN role can access this. It allows adding, editing, deleting products and updating order status."

---

### **37. Chatbot.jsx**
**Purpose:** AI shopping assistant

```jsx
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const handleSendMessage = async () => {
    // Add user message
    setMessages([...messages, {
      sender: 'user',
      text: input
    }]);
    
    // Send to backend
    const response = await API.post('/chat', {
      message: input
    });
    
    // Add bot response
    setMessages([...messages, 
      { sender: 'user', text: input },
      { 
        sender: 'bot', 
        text: response.data.reply,
        products: response.data.recommendedProducts
      }
    ]);
    
    setInput('');
  };
  
  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            {msg.products && (
              <div className="product-recommendations">
                {msg.products.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
```

**For Viva:** "Chatbot component maintains conversation history in state. When user sends a message, it calls backend /chat endpoint and displays the response along with any product recommendations."

---

### **38. OrderHistory.jsx**
**Purpose:** User's order history

```jsx
function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    API.get(`/orders/user/${user.email}`)
      .then(response => setOrders(response.data));
  }, []);
  
  return (
    <div className="order-history">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Order #{order.orderId}</h3>
          <p>Status: {order.status}</p>
          <p>Date: {order.orderDate}</p>
          <p>Total: ${order.totalAmount}</p>
          
          <h4>Items:</h4>
          {order.orderItems.map(item => (
            <div key={item.id}>
              {item.product.name} x {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

**For Viva:** "OrderHistory fetches user's orders from backend using their email. It displays order details including status, items, and total amount. This ensures users only see their own orders (privacy fix we implemented)."

---

## 📁 src/Context/

### **39. Context.jsx** (AppContext)
**Purpose:** Global state management for cart and wishlist

```jsx
const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(item =>
      item.id === productId 
        ? { ...item, quantity }
        : item
    ));
  };
  
  return (
    <AppContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
```

**For Viva:** "Context API provides global state without prop drilling. Cart and wishlist are accessible from any component. When you call addToCart(), it updates the cart state, and all components using useAppContext() automatically re-render with new data."

---

### **40. AuthContext.jsx**
**Purpose:** User authentication state

```jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const login = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    setUser(response.data.user);
    setIsAdmin(response.data.user.role === 'ADMIN');
    localStorage.setItem('user', JSON.stringify(response.data.user));
  };
  
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };
  
  // Check localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.role === 'ADMIN');
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**For Viva:** "AuthContext manages logged-in user state. It persists user data in localStorage so they stay logged in after page refresh. Components can check `isAdmin` to show/hide admin features."

---

## 📁 src/services/

### **41. orderService.js**
**Purpose:** Order API calls

```jsx
import API from '../axios';

export const orderService = {
  placeOrder: async (orderData) => {
    const response = await API.post('/orders/place', orderData);
    return response.data;
  },
  
  getUserOrders: async (email) => {
    const response = await API.get(`/orders/user/${email}`);
    return response.data;
  },
  
  getAllOrders: async () => {
    const response = await API.get('/orders');
    return response.data;
  }
};
```

**For Viva:** "Service files encapsulate API logic. Instead of writing axios calls everywhere, we centralize them here. This makes code cleaner and easier to maintain."

---

### **42. productService.js**
```jsx
export const productService = {
  getAllProducts: async () => {
    const response = await API.get('/products');
    return response.data;
  },
  
  searchProducts: async (keyword) => {
    const response = await API.get(`/products/search?keyword=${keyword}`);
    return response.data;
  },
  
  getProductById: async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
  }
};
```

---

## 📁 src/

### **43. axios.jsx**
**Purpose:** Configured Axios instance

```jsx
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
```

**For Viva:** "We create a configured Axios instance instead of using raw axios. It sets base URL so we can write API.get('/products') instead of full URL. Interceptors automatically add auth tokens to every request."

---

## 📁 Root Files

### **44. package.json**
**Purpose:** Frontend dependencies and scripts

```json
{
  "name": "ecom-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.0.0",
    "bootstrap": "^5.0.0"
  },
  "scripts": {
    "dev": "vite",           // Start dev server
    "build": "vite build",   // Build for production
    "preview": "vite preview" // Preview production build
  }
}
```

**For Viva:** "package.json lists all npm packages we need. Scripts section defines commands we can run. npm run dev starts Vite dev server on port 5173."

---

### **45. vite.config.js**
**Purpose:** Vite build tool configuration

```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

**For Viva:** "Vite is our build tool (like Webpack but faster). This config sets port to 5173 and optionally proxies API calls to backend during development."

---

### **46. index.html**
**Purpose:** HTML entry point

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-Commerce Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**For Viva:** "This is the single HTML file. React mounts entire app inside the div with id='root'. The script tag loads our React code."

---

## 📁 CSS Files

### **47. index.css**
Global styles

### **48. Home.css**
Homepage specific styles

### **49. Product.css**
Product page styles

**For Viva:** "We separate CSS by component for better organization. index.css has global styles, while component-specific files have scoped styles."

---

---

# 🎯 FLOW SUMMARY

## **When User Visits Homepage:**
1. Browser loads `index.html`
2. `main.jsx` runs, renders `App.jsx`
3. `App.jsx` shows `Home.jsx` component
4. `Home.jsx` calls `useEffect()`
5. Axios sends `GET http://localhost:8080/api/products`
6. **Backend:** `ProductController.getAllProducts()` receives request
7. **Backend:** `ProductService.getAllProducts()` called
8. **Backend:** `ProductRepo.findAll()` queries PostgreSQL
9. **Backend:** Returns JSON array of products
10. `Home.jsx` receives data, calls `setProducts()`
11. React re-renders with product cards

## **When User Adds to Cart:**
1. User clicks "Add to Cart" button
2. `ProductCard` calls `addToCart(product)`
3. `Context.jsx` updates cart state
4. All components using cart re-render
5. Navbar shows updated count

## **When User Places Order:**
1. User clicks "Checkout"
2. `Cart.jsx` calls `orderService.placeOrder()`
3. Axios sends `POST http://localhost:8080/api/orders/place`
4. **Backend:** `OrderController.placeOrder()` receives request
5. **Backend:** `OrderService.placeOrder()` processes:
   - Generates Order ID
   - Validates stock
   - Creates Order entity
   - Creates OrderItem entities
   - Reduces product stock
   - Saves to database
6. **Backend:** Returns Order ID
7. Frontend navigates to `/orders`

---

# 📝 KEY TERMS FOR VIVA

1. **Controller:** Handles HTTP requests, calls service layer
2. **Service:** Contains business logic
3. **Repository:** Database access layer
4. **Entity:** Java class that maps to database table
5. **DTO:** Data Transfer Object - for sending data between layers
6. **JPA:** Java Persistence API - ORM framework
7. **Hibernate:** Implementation of JPA
8. **REST API:** Web service using HTTP methods (GET, POST, PUT, DELETE)
9. **Component:** Reusable React UI element
10. **Hook:** React function (useState, useEffect, useContext)
11. **Context API:** Global state management in React
12. **Axios:** HTTP client library
13. **CORS:** Cross-Origin Resource Sharing
14. **JWT:** JSON Web Token (for authentication)

---

**Good luck with your viva! 🚀**
