package com.telusko.SpringEcom.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record OrderRequest(
        @NotBlank(message = "Customer name is required")
        String customerName,
        
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,
        
        @NotEmpty(message = "At least one item is required")
        List<OrderItemRequest> items
) {}
