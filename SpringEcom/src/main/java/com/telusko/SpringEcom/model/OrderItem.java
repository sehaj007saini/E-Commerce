package com.telusko.SpringEcom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @NotNull(message = "Product is required")
    private Product product;
    
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
    
    @NotNull(message = "Total price is required")
    private BigDecimal totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull(message = "Order is required")
    private Order order;
}
