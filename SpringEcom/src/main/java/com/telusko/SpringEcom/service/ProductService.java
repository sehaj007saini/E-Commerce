package com.telusko.SpringEcom.service;

import com.telusko.SpringEcom.exception.ResourceNotFoundException;
import com.telusko.SpringEcom.model.Product;
import com.telusko.SpringEcom.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productrepo;

    public List<Product> getAllProducts() {
        return productrepo.findAll();
    }

    public Product getProductsById(int id) {
        return productrepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product addorUpdateProduct(Product product, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            product.setImageName(image.getOriginalFilename());
            product.setImageType(image.getContentType());
            product.setImageData(image.getBytes());
        }
        return productrepo.save(product);
    }

    public void deleteProduct(int id) {
        if (!productrepo.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productrepo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllProducts();
        }
        return productrepo.searchProducts(keyword);
    }
}
