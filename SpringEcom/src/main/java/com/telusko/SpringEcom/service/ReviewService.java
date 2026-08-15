package com.telusko.SpringEcom.service;

import com.telusko.SpringEcom.exception.ResourceNotFoundException;
import com.telusko.SpringEcom.model.Product;
import com.telusko.SpringEcom.model.Review;
import com.telusko.SpringEcom.repo.ProductRepo;
import com.telusko.SpringEcom.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepo productRepo;

    public List<Review> getReviewsForProduct(Integer productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public Review addReview(Integer productId, Review review) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        review.setProduct(product);
        if (review.getCreatedAt() == null) {
            review.setCreatedAt(LocalDateTime.now());
        }

        return reviewRepository.save(review);
    }
}
