package com.telusko.SpringEcom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
    private String reply;
    private List<RecommendedProduct> recommendedProducts;
    private List<String> suggestedQuestions;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecommendedProduct {
        private Integer id;
        private String name;
        private String brand;
        private BigDecimal price;
        private String category;
        private Integer stockQuantity;
        private double averageRating;
        private String description;
    }
}
