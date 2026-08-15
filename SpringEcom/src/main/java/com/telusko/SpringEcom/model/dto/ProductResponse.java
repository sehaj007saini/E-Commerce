package com.telusko.SpringEcom.model.dto;

import java.math.BigDecimal;
import java.util.Date;

public record ProductResponse(
        Integer id,
        String name,
        String description,
        String brand,
        BigDecimal price,
        String category,
        Date releaseDate,
        boolean productAvailable,
        Integer stockQuantity,
        String imageName,
        boolean hasImage
) {}
