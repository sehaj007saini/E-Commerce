package com.telusko.SpringEcom.controller;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class CleanupController {

    @PersistenceContext
    private EntityManager entityManager;

    @DeleteMapping("/cleanup-duplicates")
    @Transactional
    public ResponseEntity<Map<String, Object>> cleanupDuplicateProducts() {
        List<Integer> duplicateIds = Arrays.asList(
            14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 
            34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55
        );

        Map<String, Object> result = new HashMap<>();

        try {
            // Delete related reviews first
            int reviewsDeleted = entityManager.createQuery(
                "DELETE FROM Review r WHERE r.product.id IN :ids")
                .setParameter("ids", duplicateIds)
                .executeUpdate();

            // Delete related order items
            int orderItemsDeleted = entityManager.createQuery(
                "DELETE FROM OrderItem oi WHERE oi.product.id IN :ids")
                .setParameter("ids", duplicateIds)
                .executeUpdate();

            // Delete duplicate products
            int productsDeleted = entityManager.createQuery(
                "DELETE FROM Product p WHERE p.id IN :ids")
                .setParameter("ids", duplicateIds)
                .executeUpdate();

            // Count remaining products
            Long remainingProducts = (Long) entityManager.createQuery(
                "SELECT COUNT(p) FROM Product p")
                .getSingleResult();

            result.put("success", true);
            result.put("reviewsDeleted", reviewsDeleted);
            result.put("orderItemsDeleted", orderItemsDeleted);
            result.put("productsDeleted", productsDeleted);
            result.put("remainingProducts", remainingProducts);
            result.put("message", "Successfully cleaned " + productsDeleted + " duplicate products");

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "Failed to cleanup duplicates: " + e.getMessage());
            return ResponseEntity.status(500).body(result);
        }
    }
}
