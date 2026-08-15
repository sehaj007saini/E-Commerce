package com.telusko.SpringEcom.controller;

import com.telusko.SpringEcom.model.Review;
import com.telusko.SpringEcom.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{productId}/reviews")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Integer productId) {
        List<Review> reviews = reviewService.getReviewsForProduct(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{productId}/reviews")
    public ResponseEntity<Review> addReview(
            @PathVariable Integer productId,
            @Valid @RequestBody Review review) {
        Review savedReview = reviewService.addReview(productId, review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }
}
