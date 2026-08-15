# Spring E-Commerce Backend

A robust RESTful API for an e-commerce platform built with Spring Boot, PostgreSQL, and JPA/Hibernate.

## 🚀 Features

- **Product Management**
  - CRUD operations for products
  - Image upload and storage
  - Full-text search across multiple fields
  - Stock tracking

- **Order Management**
  - Place orders with multiple items
  - Automatic inventory management
  - Order status tracking
  - Order cancellation with stock restoration

- **Robust Error Handling**
  - Global exception handling
  - Validation on all inputs
  - Meaningful error messages

- **Security Best Practices**
  - Environment variable configuration
  - Input validation
  - SQL injection prevention

## 🛠️ Tech Stack

- **Java 21**
- **Spring Boot 4.1.0**
- **Spring Data JPA**
- **PostgreSQL**
- **Lombok**
- **Maven**

## 📋 Prerequisites

- Java 21+
- PostgreSQL 12+
- Maven 3.6+

## ⚙️ Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SpringEcom
```

### 2. Setup Database
```sql
CREATE DATABASE telusko2;
```

### 3. Configure Environment Variables
```bash
export DB_URL=jdbc:postgresql://localhost:5432/telusko2
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
```

Or create a `.env` file (see `.env.example`)

### 4. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 Documentation

- **[API Documentation](README_API.md)** - Complete API reference with examples
- **[Setup Guide](SETUP.md)** - Detailed installation and configuration instructions

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/product/{id}` - Get product by ID
- `POST /api/product` - Create new product
- `PUT /api/product/{id}` - Update product
- `DELETE /api/product/{id}` - Delete product
- `GET /api/products/search?keyword={keyword}` - Search products

### Orders
- `POST /api/orders/place` - Place a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/{orderId}` - Get order by ID
- `PATCH /api/orders/{orderId}/status` - Update order status
- `DELETE /api/orders/{orderId}/cancel` - Cancel order

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Manual Testing
Use the provided API examples in `README_API.md` with cURL, Postman, or any HTTP client.

## 🏗️ Project Structure

```
src/main/java/com/telusko/SpringEcom/
├── controller/       # REST Controllers
├── service/          # Business Logic
├── repo/            # Data Access Layer
├── model/           # Entities and DTOs
├── exception/       # Custom Exceptions and Error Handling
└── SpringEcomApplication.java
```

## 🔐 Security Notes

⚠️ **Important:** Never commit sensitive credentials to version control!

- Use environment variables for database credentials
- The `.env` file is gitignored by default
- See `SETUP.md` for secure configuration options

## 🎯 Key Improvements in This Version

✅ Input validation on all endpoints  
✅ Global exception handling with meaningful errors  
✅ Proper stock management with concurrency safety  
✅ Environment-based configuration  
✅ Order cancellation with stock restoration  
✅ Clean separation of DTOs and entities  
✅ RESTful API design with proper HTTP status codes  
✅ Comprehensive error responses  
✅ Image handling improvements  

## 🚧 Future Enhancements

- [ ] Spring Security integration (JWT authentication)
- [ ] User management and authorization
- [ ] Payment gateway integration
- [ ] Shopping cart functionality
- [ ] Product categories as entities
- [ ] Order history for customers
- [ ] Email notifications
- [ ] API rate limiting
- [ ] Swagger/OpenAPI documentation
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using Spring Boot**
