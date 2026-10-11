# E-Commerce Platform - Full Stack Application

A modern, feature-rich e-commerce platform built with Spring Boot backend and React frontend.

![Java](https://img.shields.io/badge/Java-25-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)

## 🚀 Features

### Customer Features
- 🛍️ Product browsing with advanced search and filters
- 🛒 Shopping cart with real-time updates
- ❤️ Wishlist functionality
- 💳 Secure checkout with coupon support
- 📦 Order tracking and history
- ⭐ Product reviews and ratings
- 🤖 AI Shopping Assistant (Rule-based chatbot)
- 🎨 Dark/Light theme toggle
- 📱 Fully responsive design

### Admin Features
- 📊 Admin dashboard with analytics
- ➕ Add/Edit/Delete products
- 📋 Order management
- 🎟️ Coupon management
- 📈 Sales statistics

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 4.1.0
- **Language:** Java 25
- **Database:** PostgreSQL 18
- **ORM:** Hibernate/JPA
- **Security:** Spring Security with JWT
- **API:** RESTful architecture

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** CSS3 + Bootstrap 5
- **HTTP Client:** Axios
- **State Management:** Context API

## 📋 Prerequisites

### Option 1: Docker (Recommended - Easiest)
- Docker Desktop
- Docker Compose (included with Docker Desktop)
- 4GB RAM for Docker

### Option 2: Local Development
- Java 17 or higher
- Node.js 18+ and npm
- PostgreSQL 12+
- Maven (included via wrapper)

## 🔧 Installation & Setup

### Option 1: Docker Setup (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/sehaj007saini/E-Commerce.git
cd E-Commerce

# 2. Copy environment file
cp .env.docker .env

# 3. Start all services
docker-compose up -d

# 4. Access the application
# Frontend: http://localhost
# Backend API: http://localhost:8080/api
# Database: localhost:5432
```

That's it! Docker will automatically:
- Setup PostgreSQL database
- Build and run Spring Boot backend
- Build and run React frontend
- Configure networking between services

For detailed Docker instructions, see [DOCKER_SETUP.md](DOCKER_SETUP.md)

---

### Option 2: Manual Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sehaj007saini/E-Commerce.git
cd E-Commerce
```

### 2. Backend Setup

```bash
cd SpringEcom

# Create .env file from example
cp .env.example .env

# Edit .env and add your database credentials
# DB_URL=jdbc:postgresql://localhost:5432/your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run the application
./mvnw spring-boot:run
```

Backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd ecom-frontend-5-main/ecom-frontend-5-main

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on `http://localhost:5173`

### 4. Database Setup

```sql
-- Create database
CREATE DATABASE telusko2;

-- Application will auto-create tables on first run (spring.jpa.hibernate.ddl-auto=update)
```

## 🔐 Environment Variables

### Backend (.env)
```env
DB_URL=jdbc:postgresql://localhost:5432/telusko2
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8080
```

## 📦 Project Structure

```
SummerProject/
├── SpringEcom/                 # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/telusko/SpringEcom/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── model/
│   │   │   │       ├── repo/
│   │   │   │       ├── dto/
│   │   │   │       └── config/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── .env.example
│   ├── .gitignore
│   └── pom.xml
│
└── ecom-frontend-5-main/
    └── ecom-frontend-5-main/   # Frontend (React)
        ├── src/
        │   ├── components/
        │   ├── Context/
        │   ├── services/
        │   ├── utils/
        │   ├── styles/
        │   └── config/
        ├── public/
        ├── .env.example
        └── package.json
```

## 🎯 Default Credentials

### Admin Login
Contact the repository owner for demo admin credentials.

### Test User
- **Username:** `user`
- **Password:** `password`

## 🤖 AI Chatbot

The application includes an intelligent shopping assistant that helps users:
- Find products based on search queries
- Filter products by price range
- Get active discount coupons
- Learn about shipping and return policies
- Track orders

**Note:** This is a rule-based chatbot, not using external AI APIs like ChatGPT.

## 📊 Sample Coupons

- **WELCOME10** - 10% off
- **SUMMER20** - 20% off
- **FLAT50** - $50 flat discount

## 🔗 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search?keyword={keyword}` - Search products
- `POST /api/chat` - Chatbot endpoint
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints (Admin)
- `POST /api/products` - Add product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/orders` - Get all orders
- `PUT /api/orders/{id}/status` - Update order status

## 🚀 Production Build

### Using Docker (Recommended)
```bash
# Build and run all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Build

#### Backend
```bash
cd SpringEcom
./mvnw clean package
java -jar target/SpringEcom-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
cd ecom-frontend-5-main/ecom-frontend-5-main
npm run build
# Deploy the 'dist' folder to your hosting service
```

## 🧪 Testing

### Backend Tests
```bash
cd SpringEcom
./mvnw test
```

### Frontend Tests
```bash
cd ecom-frontend-5-main/ecom-frontend-5-main
npm test
```

## 🐳 Docker Support

This project includes full Docker support for easy deployment:

- **docker-compose.yml**: Orchestrates all services (database, backend, frontend)
- **Dockerfiles**: Optimized multi-stage builds for backend and frontend
- **Health Checks**: Automatic service health monitoring
- **Persistent Storage**: Database data persisted in Docker volumes
- **Easy Deployment**: One command to run everything

See [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed Docker instructions.

## 🐛 Known Issues

- Category names are case-sensitive (some are "laptop", others "Laptop")
- Consider normalizing category names for consistency

## 🔜 Future Enhancements

- [ ] Real AI integration (ChatGPT/Claude)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product recommendations based on browsing history
- [ ] Social media login
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 📄 License

This project is for educational purposes.

## 👤 Author

Full-stack e-commerce project developed during summer training.

## 🙏 Acknowledgments

- Built with Spring Boot & React
- Follows modern web development best practices

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**⭐ If you find this project useful, please consider giving it a star!**
