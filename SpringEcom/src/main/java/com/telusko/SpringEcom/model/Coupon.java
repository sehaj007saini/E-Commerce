package com.telusko.SpringEcom.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Coupon code is required")
    private String code;

    private BigDecimal discountPercentage; // e.g. 10.00 for 10%

    private BigDecimal discountAmount;     // e.g. 50.00 for $50 off

    private boolean active = true;

    private String description;
}
