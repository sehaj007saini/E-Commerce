package com.telusko.SpringEcom.service;

import com.telusko.SpringEcom.model.User;
import com.telusko.SpringEcom.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> registerUser(User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.existsByUsername(user.getUsername())) {
            response.put("success", false);
            response.put("message", "Username is already taken");
            return response;
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "Email is already registered");
            return response;
        }

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        }

        User savedUser = userRepository.save(user);

        response.put("success", true);
        response.put("message", "User registered successfully");
        response.put("user", Map.of(
                "id", savedUser.getId(),
                "username", savedUser.getUsername(),
                "email", savedUser.getEmail(),
                "role", savedUser.getRole()
        ));
        return response;
    }

    public Map<String, Object> loginUser(String username, String password) {
        Map<String, Object> response = new HashMap<>();

        // Admin fallback check
        if ("admin".equalsIgnoreCase(username) && "admin123".equals(password)) {
            response.put("success", true);
            response.put("message", "Admin login successful");
            response.put("token", "admin-jwt-token-secret");
            response.put("user", Map.of(
                    "username", "admin",
                    "email", "admin@ecom.com",
                    "role", "ROLE_ADMIN"
            ));
            return response;
        }

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("token", "user-token-" + user.getId());
                response.put("user", Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "role", user.getRole()
                ));
                return response;
            }
        }

        response.put("success", false);
        response.put("message", "Invalid username or password");
        return response;
    }
}
