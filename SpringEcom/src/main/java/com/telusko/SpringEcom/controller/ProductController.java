package com.telusko.SpringEcom.controller;

import com.telusko.SpringEcom.model.Product;
import com.telusko.SpringEcom.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {

    @Autowired
    public ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productService.getProductsById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/product/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId) {
        Product product = productService.getProductsById(productId);
        
        if (product.getImageData() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(product.getImageType()))
                    .body(product.getImageData());
        }
        
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/product")
    public ResponseEntity<Product> addProduct(
            @RequestPart @Valid Product product,
            @RequestPart(required = false) MultipartFile imageFile) {
        try {
            Product savedProduct = productService.addorUpdateProduct(product, imageFile);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable int id,
            @RequestPart @Valid Product product,
            @RequestPart(required = false) MultipartFile imageFile) {
        try {
            // Ensure we're updating the correct product
            product.setId(id);
            Product updatedProduct = productService.addorUpdateProduct(product, imageFile);
            return ResponseEntity.ok(updatedProduct);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(products);
    }
}
