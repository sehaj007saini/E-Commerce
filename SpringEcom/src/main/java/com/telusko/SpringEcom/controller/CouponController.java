package com.telusko.SpringEcom.controller;

import com.telusko.SpringEcom.model.Coupon;
import com.telusko.SpringEcom.repo.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin
public class CouponController {

    @Autowired
    private CouponRepository couponRepository;

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateCoupon(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        Map<String, Object> response = new HashMap<>();

        if (code == null || code.trim().isEmpty()) {
            response.put("valid", false);
            response.put("message", "Coupon code is empty");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<Coupon> couponOpt = couponRepository.findByCodeIgnoreCaseAndActiveTrue(code.trim());

        if (couponOpt.isPresent()) {
            Coupon coupon = couponOpt.get();
            response.put("valid", true);
            response.put("code", coupon.getCode());
            response.put("discountPercentage", coupon.getDiscountPercentage());
            response.put("discountAmount", coupon.getDiscountAmount());
            response.put("description", coupon.getDescription());
            response.put("message", "Coupon applied successfully!");
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("message", "Invalid or expired promo code");
            return ResponseEntity.ok(response);
        }
    }
}
