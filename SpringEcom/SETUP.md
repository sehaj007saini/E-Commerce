# Spring E-Commerce Setup Guide

## Prerequisites

- Java 21 or higher
- PostgreSQL 12 or higher
- Maven 3.6+
- Git

## Database Setup

1. **Install PostgreSQL** (if not already installed)

2. **Create Database**
   ```sql
   CREATE DATABASE telusko2;
   ```

3. **Create User** (optional, or use existing postgres user)
   ```sql
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE telusko2 TO your_username;
   ```

## Application Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SpringEcom
```

### 2. Configure Environment Variables

Create a `.env` file in the project root (or set system environment variables):

```env
DB_URL=jdbc:postgresql://localhost:5432/telusko2
DB_USERNAME=postgres
DB_PASSWORD=your_actual_password
```

**Note:** The `.env` file is gitignored for security.

### 3. Configure Application (Alternative Method)

If not using environment variables, you can create `application-local.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/telusko2
spring.datasource.username=postgres
spring.datasource.password=your_password
```

Then run with:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### 4. Build the Project
```bash
mvn clean install
```

### 5. Run the Application
```bash
mvn spring-boot:run
```

Or with environment variables:
```bash
export DB_URL=jdbc:postgresql://localhost:5432/telusko2
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
mvn spring-boot:run
```

### 6. Verify Application is Running

Open your browser or API client and navigate to:
```
http://localhost:8080/api/products
```

You should see an empty array `[]` or list of products if data was seeded.

## Initial Data (Optional)

The application will automatically create tables on startup. To add sample data, you can:

1. Use the API endpoints to add products
2. Update `src/main/resources/data.sql` with INSERT statements

## Testing the API

### Using cURL

**Add a Product:**
```bash
curl -X POST http://localhost:8080/api/product \
  -F 'product={"name":"Test Product","brand":"TestBrand","price":99.99,"category":"Electronics","stockQuantity":10,"productAvailable":true};type=application/json' \
  -F 'imageFile=@/path/to/image.jpg'
```

**Get All Products:**
```bash
curl http://localhost:8080/api/products
```

**Place an Order:**
```bash
curl -X POST http://localhost:8080/api/orders/place \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "items": [{"productId": 1, "quantity": 2}]
  }'
```

### Using Postman

Import the API documentation from `README_API.md` or create requests manually.

## Troubleshooting

### Database Connection Issues

**Error:** `Connection refused` or `authentication failed`

**Solution:**
1. Verify PostgreSQL is running: `pg_isready`
2. Check credentials in environment variables
3. Verify database exists: `psql -l`
4. Check PostgreSQL is listening on localhost:5432

### Port Already in Use

**Error:** `Port 8080 is already in use`

**Solution:**
Add to `application.properties`:
```properties
server.port=8081
```

### Image Upload Issues

**Error:** `Maximum upload size exceeded`

**Solution:**
Adjust in `application.properties`:
```properties
spring.servlet.multipart.max-file-size=20MB
spring.servlet.multipart.max-request-size=20MB
```

## Development Tips

### Hot Reload
Add spring-boot-devtools dependency for automatic restart:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

### View SQL Queries
Enable in `application.properties`:
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Database GUI Tools
- pgAdmin 4
- DBeaver
- DataGrip

## Production Deployment

### Security Checklist
- [ ] Change all default passwords
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Add Spring Security
- [ ] Configure CORS properly
- [ ] Set up logging and monitoring
- [ ] Use production database with backups
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` (not update)

### Build for Production
```bash
mvn clean package -DskipTests
java -jar target/SpringEcom-0.0.1-SNAPSHOT.jar
```

## Support

For issues and questions, please refer to:
- API Documentation: `README_API.md`
- Spring Boot Documentation: https://spring.io/projects/spring-boot
- PostgreSQL Documentation: https://www.postgresql.org/docs/
