# Docker Setup Guide

This guide explains how to run the E-Commerce application using Docker.

## Prerequisites

- Docker Desktop installed (Windows/Mac/Linux)
- Docker Compose (included with Docker Desktop)
- At least 4GB RAM available for Docker
- Ports 80, 5432, and 8080 available

## Quick Start

### 1. Setup Environment Variables

```bash
# Copy the example environment file
cp .env.docker .env

# Edit .env and set your database password (default is already set)
```

### 2. Build and Run

```bash
# Build and start all services (database, backend, frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

### 3. Access the Application

- **Frontend:** http://localhost
- **Backend API:** http://localhost:8080/api
- **Database:** localhost:5432

### 4. Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This deletes all data)
docker-compose down -v
```

## Docker Commands

### Managing Services

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Restart specific service
docker-compose restart backend

# View running containers
docker-compose ps

# View logs
docker-compose logs -f
```

### Rebuilding

```bash
# Rebuild all images
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild and restart
docker-compose up -d --build
```

### Database Management

```bash
# Access PostgreSQL shell
docker-compose exec database psql -U postgres -d telusko2

# Backup database
docker-compose exec database pg_dump -U postgres telusko2 > backup.sql

# Restore database
docker-compose exec -T database psql -U postgres telusko2 < backup.sql
```

### Cleanup

```bash
# Remove stopped containers
docker-compose rm

# Remove all containers, networks, and volumes
docker-compose down -v

# Clean up unused Docker resources
docker system prune -a
```

## Architecture

The application consists of 3 services:

1. **Database (PostgreSQL 18)**
   - Container name: `ecommerce-db`
   - Port: 5432
   - Volume: `postgres_data` (persistent storage)

2. **Backend (Spring Boot)**
   - Container name: `ecommerce-backend`
   - Port: 8080
   - Waits for database to be ready before starting

3. **Frontend (React + Nginx)**
   - Container name: `ecommerce-frontend`
   - Port: 80
   - Serves static files via Nginx
   - Proxies API requests to backend

## File Structure

```
F:\SummerProject\
├── docker-compose.yml                    # Main orchestration file
├── .env.docker                           # Environment variables template
├── .env                                  # Your environment variables (create this)
├── DOCKER_SETUP.md                       # This file
│
├── SpringEcom/
│   ├── Dockerfile                        # Backend Docker image
│   └── .dockerignore                     # Files to exclude
│
└── ecom-frontend-5-main/ecom-frontend-5-main/
    ├── Dockerfile                        # Frontend Docker image
    ├── .dockerignore                     # Files to exclude
    └── nginx.conf                        # Nginx configuration
```

## Troubleshooting

### Port Conflicts

If ports are already in use, modify `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "3000:80"  # Change 80 to 3000 or any available port
  
  backend:
    ports:
      - "8081:8080"  # Change 8080 to 8081
  
  database:
    ports:
      - "5433:5432"  # Change 5432 to 5433
```

### Backend Not Starting

```bash
# Check logs
docker-compose logs backend

# Check database connection
docker-compose exec backend ping database

# Restart backend
docker-compose restart backend
```

### Frontend Not Loading

```bash
# Check logs
docker-compose logs frontend

# Verify backend is running
docker-compose ps

# Rebuild frontend
docker-compose up -d --build frontend
```

### Database Connection Issues

```bash
# Check database is healthy
docker-compose ps

# Test database connection
docker-compose exec database psql -U postgres -c "SELECT 1"

# Reset database (WARNING: Deletes all data)
docker-compose down -v
docker-compose up -d
```

### Memory Issues

If Docker runs out of memory:

1. Open Docker Desktop Settings
2. Go to Resources
3. Increase Memory to at least 4GB
4. Click Apply & Restart

## Production Deployment

### Using Docker Compose

```bash
# Build for production
docker-compose -f docker-compose.yml build

# Run in production mode
docker-compose -f docker-compose.yml up -d
```

### Using Docker Hub

```bash
# Tag images
docker tag ecommerce-backend:latest yourusername/ecommerce-backend:latest
docker tag ecommerce-frontend:latest yourusername/ecommerce-frontend:latest

# Push to Docker Hub
docker push yourusername/ecommerce-backend:latest
docker push yourusername/ecommerce-frontend:latest

# Pull and run on production server
docker pull yourusername/ecommerce-backend:latest
docker pull yourusername/ecommerce-frontend:latest
docker-compose up -d
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_PASSWORD` | PostgreSQL password | postgres |
| `DB_PORT` | Database port | 5432 |
| `BACKEND_PORT` | Backend API port | 8080 |
| `FRONTEND_PORT` | Frontend port | 80 |

## Health Checks

All services include health checks:

- **Database:** Checks PostgreSQL is accepting connections
- **Backend:** Checks Spring Boot actuator endpoint
- **Frontend:** Nginx automatically manages health

View health status:
```bash
docker-compose ps
```

## Performance Tips

1. **Use volumes for development:** Mount source code to see changes without rebuilding
2. **Prune regularly:** Run `docker system prune` to free up space
3. **Limit logs:** Configure log rotation in docker-compose.yml
4. **Use .dockerignore:** Exclude unnecessary files from builds

## Security Notes

- Change default database password in `.env`
- Don't commit `.env` file to git
- Use secrets management for production
- Keep Docker images updated
- Run containers as non-root user in production

## Support

For issues or questions:
- Check Docker logs: `docker-compose logs`
- Verify all services are running: `docker-compose ps`
- Restart services: `docker-compose restart`

---

**🐳 Happy Dockering!**
