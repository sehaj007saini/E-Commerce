# Spring E-Commerce API Documentation

## Base URL
```
http://localhost:8080/api
```

## Product Endpoints

### 1. Get All Products
```
GET /api/products
```
**Response:** List of all products

### 2. Get Product by ID
```
GET /api/product/{id}
```
**Response:** Single product details

### 3. Get Product Image
```
GET /api/product/{productId}/image
```
**Response:** Product image as byte array

### 4. Search Products
```
GET /api/products/search?keyword={keyword}
```
**Parameters:**
- `keyword` - Search term (searches name, description, brand, category)

**Response:** List of matching products

### 5. Add New Product
```
POST /api/product
```
**Content-Type:** `multipart/form-data`

**Request Body:**
- `product` (JSON) - Product details
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "brand": "Brand Name",
    "price": 99.99,
    "category": "Electronics",
    "releaseDate": "2024-01-01",
    "productAvailable": true,
    "stockQuantity": 100
  }
  ```
- `imageFile` (file, optional) - Product image

**Response:** Created product with HTTP 201

### 6. Update Product
```
PUT /api/product/{id}
```
**Content-Type:** `multipart/form-data`

**Request Body:** Same as Add Product

**Response:** Updated product

### 7. Delete Product
```
DELETE /api/product/{id}
```
**Response:** HTTP 204 No Content

---

## Order Endpoints

### 1. Place Order
```
POST /api/orders/place
```
**Request Body:**
```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "orderId": "ORD12345678",
  "customerName": "John Doe",
  "email": "john@example.com",
  "status": "PLACED",
  "orderDate": "2024-01-15",
  "items": [
    {
      "productName": "Product Name",
      "quantity": 2,
      "totalPrice": 199.98
    }
  ]
}
```

### 2. Get All Orders
```
GET /api/orders
```
**Response:** List of all orders

### 3. Get Order by Order ID
```
GET /api/orders/{orderId}
```
**Response:** Single order details

### 4. Update Order Status
```
PATCH /api/orders/{orderId}/status
```
**Request Body:**
```json
{
  "status": "SHIPPED"
}
```

**Possible Status Values:**
- `PLACED`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

**Response:** Updated order

### 5. Cancel Order
```
DELETE /api/orders/{orderId}/cancel
```
**Note:** Only orders with status "PLACED" can be cancelled. Stock will be restored.

**Response:** HTTP 204 No Content

---

## Error Responses

All errors follow this format:

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Error description",
  "path": "/api/endpoint",
  "details": ["Field validation errors if applicable"]
}
```

### Common HTTP Status Codes

- `200 OK` - Successful GET/PUT/PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error or invalid operation
- `404 Not Found` - Resource not found
- `413 Payload Too Large` - File size exceeds limit
- `500 Internal Server Error` - Unexpected server error

---

## Validation Rules

### Product Validation
- `name` - Required, 2-100 characters
- `brand` - Required
- `price` - Required, must be > 0
- `category` - Required
- `stockQuantity` - Cannot be negative

### Order Validation
- `customerName` - Required
- `email` - Required, valid email format
- `items` - Required, at least one item
- `quantity` - Must be at least 1

---

## Business Logic

### Stock Management
- Stock is automatically reduced when orders are placed
- Products become unavailable when stock reaches 0
- Stock is restored when orders are cancelled
- Orders fail if insufficient stock is available

### Order Management
- Each order gets a unique order ID (ORD + 8 random characters)
- Orders start with "PLACED" status
- Only "PLACED" orders can be cancelled
- Cancelling an order restores product inventory
