package com.telusko.SpringEcom.service;

import com.telusko.SpringEcom.exception.InsufficientStockException;
import com.telusko.SpringEcom.exception.InvalidOperationException;
import com.telusko.SpringEcom.exception.ResourceNotFoundException;
import com.telusko.SpringEcom.model.Order;
import com.telusko.SpringEcom.model.OrderItem;
import com.telusko.SpringEcom.model.Product;
import com.telusko.SpringEcom.model.dto.OrderItemRequest;
import com.telusko.SpringEcom.model.dto.OrderItemResponse;
import com.telusko.SpringEcom.model.dto.OrderRequest;
import com.telusko.SpringEcom.model.dto.OrderResponse;
import com.telusko.SpringEcom.repo.OrderRepo;
import com.telusko.SpringEcom.repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    private ProductRepo productRepo;
    
    @Autowired
    private OrderRepo orderRepo;

    @Transactional
    public OrderResponse placeOrder(OrderRequest request) {
        // Create order entity
        Order order = new Order();
        String orderId = "ORD" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        order.setOrderId(orderId);
        order.setCustomerName(request.customerName());
        order.setEmail(request.email());
        order.setStatus("PLACED");
        order.setOrderDate(LocalDate.now());

        List<OrderItem> orderItems = new ArrayList<>();
        
        // Process each order item
        for (OrderItemRequest itemReq : request.items()) {
            Product product = productRepo.findById(itemReq.productId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Product not found with id: " + itemReq.productId()));

            // Validate stock availability
            if (product.getStockQuantity() < itemReq.quantity()) {
                throw new InsufficientStockException(
                        "Insufficient stock for product: " + product.getName() + 
                        ". Available: " + product.getStockQuantity() + 
                        ", Requested: " + itemReq.quantity());
            }

            // Update product stock
            product.setStockQuantity(product.getStockQuantity() - itemReq.quantity());
            
            // Update availability status if out of stock
            if (product.getStockQuantity() == 0) {
                product.setProductAvailable(false);
            }
            
            productRepo.save(product);

            // Create order item
            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.quantity())
                    .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(itemReq.quantity())))
                    .order(order)
                    .build();

            orderItems.add(orderItem);
        }
        
        order.setOrderItems(orderItems);
        Order savedOrder = orderRepo.save(order);

        // Build response
        return buildOrderResponse(savedOrder);
    }

    @Transactional
    public List<OrderResponse> getAllOrderResponses() {
        List<Order> orders = orderRepo.findAll();
        List<OrderResponse> orderResponses = new ArrayList<>();

        for (Order order : orders) {
            orderResponses.add(buildOrderResponse(order));
        }
        
        return orderResponses;
    }

    public OrderResponse getOrderByOrderId(String orderId) {
        Order order = orderRepo.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with orderId: " + orderId));
        return buildOrderResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatus(String orderId, String newStatus) {
        Order order = orderRepo.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with orderId: " + orderId));
        
        order.setStatus(newStatus);
        Order updatedOrder = orderRepo.save(order);
        
        return buildOrderResponse(updatedOrder);
    }

    @Transactional
    public void cancelOrder(String orderId) {
        Order order = orderRepo.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with orderId: " + orderId));

        if (!"PLACED".equals(order.getStatus())) {
            throw new InvalidOperationException("Can only cancel orders with PLACED status. Current status: " + order.getStatus());
        }

        // Restore product stock
        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            product.setProductAvailable(true);
            productRepo.save(product);
        }

        order.setStatus("CANCELLED");
        orderRepo.save(order);
    }

    private OrderResponse buildOrderResponse(Order order) {
        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItem item : order.getOrderItems()) {
            OrderItemResponse orderItemResponse = new OrderItemResponse(
                    item.getProduct().getName(),
                    item.getQuantity(),
                    item.getTotalPrice()
            );
            itemResponses.add(orderItemResponse);
        }

        return new OrderResponse(
                order.getOrderId(),
                order.getCustomerName(),
                order.getEmail(),
                order.getStatus(),
                order.getOrderDate(),
                itemResponses
        );
    }

    public java.util.Map<String, Object> getAnalytics() {
        List<Order> orders = orderRepo.findAll();
        List<Product> products = productRepo.findAll();

        BigDecimal totalRevenue = BigDecimal.ZERO;
        java.util.Map<String, Long> statusCounts = new java.util.HashMap<>();

        for (Order order : orders) {
            statusCounts.put(order.getStatus(), statusCounts.getOrDefault(order.getStatus(), 0L) + 1);

            if (!"CANCELLED".equalsIgnoreCase(order.getStatus()) && order.getOrderItems() != null) {
                for (OrderItem item : order.getOrderItems()) {
                    if (item.getTotalPrice() != null) {
                        totalRevenue = totalRevenue.add(item.getTotalPrice());
                    }
                }
            }
        }

        long lowStockCount = products.stream()
                .filter(p -> p.getStockQuantity() != null && p.getStockQuantity() < 10)
                .count();

        List<OrderResponse> recentOrders = orders.stream()
                .sorted((a, b) -> Long.compare(b.getId(), a.getId()))
                .limit(5)
                .map(this::buildOrderResponse)
                .collect(java.util.stream.Collectors.toList());

        java.util.Map<String, Object> analytics = new java.util.HashMap<>();
        analytics.put("totalRevenue", totalRevenue);
        analytics.put("totalOrders", orders.size());
        analytics.put("totalProducts", products.size());
        analytics.put("lowStockCount", lowStockCount);
        analytics.put("statusCounts", statusCounts);
        analytics.put("recentOrders", recentOrders);

        return analytics;
    }
}
