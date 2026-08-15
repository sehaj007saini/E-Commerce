package com.telusko.SpringEcom.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemRequest(
        @NotNull(message = "Product ID is required")
        int productId,
        
        @Min(value = 1, message = "Quantity must be at least 1")
        int quantity
) {}
