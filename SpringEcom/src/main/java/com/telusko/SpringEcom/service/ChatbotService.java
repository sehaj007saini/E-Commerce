package com.telusko.SpringEcom.service;

import com.telusko.SpringEcom.dto.ChatRequest;
import com.telusko.SpringEcom.dto.ChatResponse;
import com.telusko.SpringEcom.model.Coupon;
import com.telusko.SpringEcom.model.Product;
import com.telusko.SpringEcom.repo.CouponRepository;
import com.telusko.SpringEcom.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ChatbotService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CouponRepository couponRepository;

    public ChatResponse processChatMessage(ChatRequest request) {
        String inputMsg = request.getMessage() != null ? request.getMessage().trim() : "";
        String lowerMsg = inputMsg.toLowerCase();

        List<ChatResponse.RecommendedProduct> recommendedProducts = new ArrayList<>();
        List<String> defaultSuggestions = Arrays.asList(
                "Show popular laptops",
                "Are there any discount coupons?",
                "What is your return policy?",
                "How do I track my orders?"
        );

        if (lowerMsg.isEmpty()) {
            return new ChatResponse(
                    "Hello! 👋 I'm your AI Shopping Assistant. How can I help you find products or answer questions today?",
                    Collections.emptyList(),
                    defaultSuggestions
            );
        }

        // 1. Coupon queries
        if (lowerMsg.contains("coupon") || lowerMsg.contains("discount") || lowerMsg.contains("promo") || lowerMsg.contains("offer")) {
            List<Coupon> activeCoupons = couponRepository.findAll().stream()
                    .filter(Coupon::isActive)
                    .collect(Collectors.toList());

            if (activeCoupons.isEmpty()) {
                return new ChatResponse(
                        "Currently, there are no active discount coupons. Keep an eye out for upcoming seasonal sales!",
                        Collections.emptyList(),
                        Arrays.asList("Show all products", "Show laptops", "Top rated items")
                );
            }

            StringBuilder reply = new StringBuilder("🎟️ **Available Discount Coupons:**\n\n");
            for (Coupon c : activeCoupons) {
                reply.append("• **").append(c.getCode()).append("** — ");
                if (c.getDiscountPercentage() != null && c.getDiscountPercentage().doubleValue() > 0) {
                    reply.append(c.getDiscountPercentage()).append("% OFF");
                } else if (c.getDiscountAmount() != null && c.getDiscountAmount().doubleValue() > 0) {
                    reply.append("$").append(c.getDiscountAmount()).append(" OFF");
                }
                if (c.getDescription() != null && !c.getDescription().isBlank()) {
                    reply.append(" (").append(c.getDescription()).append(")");
                }
                reply.append("\n");
            }
            reply.append("\nYou can apply any coupon during checkout!");

            return new ChatResponse(
                    reply.toString(),
                    Collections.emptyList(),
                    Arrays.asList("Show popular products", "Help with checkout", "Return policy")
            );
        }

        // 2. Order tracking / history queries
        if (lowerMsg.contains("order") || lowerMsg.contains("track") || lowerMsg.contains("delivery") || lowerMsg.contains("shipping")) {
            String reply = "📦 **Order Tracking & Shipping Information:**\n\n" +
                    "• **View Past Orders**: You can check your order history anytime by clicking **My Orders** in the top menu or visiting the [/orders](/orders) page.\n" +
                    "• **Shipping Duration**: Standard orders are processed and delivered within **3-5 business days**.\n" +
                    "• **Need Help with an Existing Order?**: Log in to your account and inspect the order details in your dashboard.";
            return new ChatResponse(
                    reply,
                    Collections.emptyList(),
                    Arrays.asList("Where is my order?", "Available payment methods", "Return policy")
            );
        }

        // 3. Return / Refund policy queries
        if (lowerMsg.contains("return") || lowerMsg.contains("refund") || lowerMsg.contains("policy") || lowerMsg.contains("exchange")) {
            String reply = "🔄 **Return & Refund Policy:**\n\n" +
                    "• **Hassle-Free Returns**: We offer a **30-day money-back guarantee** on all eligible products.\n" +
                    "• **Condition**: Items must be unused, in original packaging, and with all accessories included.\n" +
                    "• **Process**: Contact support or initiate a return from your **Orders** page.";
            return new ChatResponse(
                    reply,
                    Collections.emptyList(),
                    Arrays.asList("Show best sellers", "Do you have coupons?", "Contact support")
            );
        }

        // 4. Greeting queries
        if (lowerMsg.matches("^(hi|hello|hey|greetings|hola|good morning|good evening|sup).*")) {
            return new ChatResponse(
                    "Hello! 👋 Welcome to SpringEcom! I'm your virtual AI assistant. Ask me to find products, recommend items under a budget, or check discounts!",
                    Collections.emptyList(),
                    Arrays.asList("Show top laptops", "Headphones under $200", "Current coupons", "Return policy")
            );
        }

        // 5. Product Search / Budget / Category Filtering Logic
        List<Product> allProducts = productRepo.findAll();

        // Extract potential max price limit (e.g. "under $500", "under 1000", "below 200")
        Double maxPrice = extractMaxPrice(lowerMsg);

        // Filter products based on search term, category, or general match
        List<Product> matched = allProducts.stream()
                .filter(p -> {
                    boolean textMatch = false;
                    String pName = p.getName() != null ? p.getName().toLowerCase() : "";
                    String pDesc = p.getDescription() != null ? p.getDescription().toLowerCase() : "";
                    String pBrand = p.getBrand() != null ? p.getBrand().toLowerCase() : "";
                    String pCat = p.getCategory() != null ? p.getCategory().toLowerCase() : "";

                    // Extract key search terms excluding common stopwords
                    String[] tokens = lowerMsg.replaceAll("[^a-zA-Z0-9 ]", "").split("\\s+");
                    for (String token : tokens) {
                        if (token.length() <= 2 || isStopWord(token)) continue;
                        if (pName.contains(token) || pDesc.contains(token) || pBrand.contains(token) || pCat.contains(token)) {
                            textMatch = true;
                            break;
                        }
                    }

                    if (maxPrice != null && p.getPrice() != null) {
                        if (p.getPrice().doubleValue() > maxPrice) {
                            return false;
                        }
                    }

                    return textMatch;
                })
                .sorted((p1, p2) -> {
                    // Sort by rating or availability
                    int availCompare = Boolean.compare(p2.isProductAvailable(), p1.isProductAvailable());
                    if (availCompare != 0) return availCompare;
                    return Double.compare(p2.getAverageRating(), p1.getAverageRating());
                })
                .limit(4)
                .collect(Collectors.toList());

        if (!matched.isEmpty()) {
            recommendedProducts = matched.stream().map(p -> new ChatResponse.RecommendedProduct(
                    p.getId(),
                    p.getName(),
                    p.getBrand(),
                    p.getPrice(),
                    p.getCategory(),
                    p.getStockQuantity(),
                    p.getAverageRating(),
                    p.getDescription()
            )).collect(Collectors.toList());

            String maxPriceMsg = maxPrice != null ? " under $" + String.format("%.0f", maxPrice) : "";
            String reply = "✨ Here are the top product recommendations matching your query" + maxPriceMsg + ":";

            return new ChatResponse(
                    reply,
                    recommendedProducts,
                    Arrays.asList("Show more in this category", "Are there discount coupons?", "Compare prices")
            );
        }

        // 6. Generic Top Recommendations fallback if no direct matches
        List<Product> topFeatured = allProducts.stream()
                .filter(Product::isProductAvailable)
                .limit(3)
                .collect(Collectors.toList());

        recommendedProducts = topFeatured.stream().map(p -> new ChatResponse.RecommendedProduct(
                p.getId(),
                p.getName(),
                p.getBrand(),
                p.getPrice(),
                p.getCategory(),
                p.getStockQuantity(),
                p.getAverageRating(),
                p.getDescription()
        )).collect(Collectors.toList());

        return new ChatResponse(
                "I couldn't find exact matches for your query, but here are some of our popular products you might love!",
                recommendedProducts,
                Arrays.asList("Show laptops", "Show electronics", "Any active coupons?")
        );
    }

    private Double extractMaxPrice(String msg) {
        Pattern pattern = Pattern.compile("(under|below|less than|<|budget|max|around)\\s*\\$?(\\d+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(msg);
        if (matcher.find()) {
            try {
                return Double.parseDouble(matcher.group(2));
            } catch (NumberFormatException ignored) {}
        }
        return null;
    }

    private boolean isStopWord(String word) {
        Set<String> stopWords = Set.of(
                "show", "me", "the", "for", "with", "and", "under", "below", "price",
                "want", "need", "looking", "find", "best", "good", "cheap", "what",
                "is", "are", "have", "you", "can", "please", "item", "items", "product", "products"
        );
        return stopWords.contains(word);
    }
}
