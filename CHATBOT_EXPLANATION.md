# 🤖 AI Chatbot - How It Works (For Viva)

## ⚠️ IMPORTANT: It's NOT Real AI!

**Your chatbot is a RULE-BASED SYSTEM, not real AI like ChatGPT.**

Think of it like an advanced "if-else" system with pattern matching.

---

## 🎯 How It Works (Simple Explanation)

### **Step-by-Step Flow:**

```
1. USER TYPES MESSAGE
   ↓
2. FRONTEND SENDS TO BACKEND
   POST /api/chat
   ↓
3. BACKEND ANALYZES MESSAGE
   - Convert to lowercase
   - Check for keywords
   - Match patterns
   ↓
4. BACKEND SEARCHES DATABASE
   - Query products
   - Filter by price/category
   - Sort by rating
   ↓
5. BACKEND RETURNS RESPONSE
   - Reply text
   - Product recommendations
   - Suggested questions
   ↓
6. FRONTEND DISPLAYS
   - Shows bot message
   - Shows product cards
   - Shows suggestion pills
```

---

## 💡 Pattern Matching Logic

### **The chatbot checks for keywords in your message:**

| User Says | Bot Detects | Bot Does |
|-----------|-------------|----------|
| "show me cheap laptops" | "cheap" + "laptop" | Returns laptops sorted by price |
| "headphones under $200" | "under" + "200" + "headphones" | Returns headphones < $200 |
| "any discount coupons?" | "discount" OR "coupon" | Queries coupon table, returns active coupons |
| "track my order" | "track" OR "order" | Returns order tracking info text |
| "return policy" | "return" OR "policy" | Returns return policy text |
| "hello" | "hello" OR "hi" | Returns greeting message |

---

## 🔍 Detailed Code Explanation

### **1. User Sends Message (Frontend)**

```javascript
// Chatbot.jsx
const handleSendMessage = async (textToSend) => {
  // 1. Create user message
  const userMessage = {
    sender: 'user',
    text: 'show me cheap laptops'
  };
  
  // 2. Send to backend
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    body: JSON.stringify({ message: 'show me cheap laptops' })
  });
  
  // 3. Get bot response
  const data = await response.json();
  // data = { reply: "...", recommendedProducts: [...], suggestedQuestions: [...] }
  
  // 4. Display bot message
  const botMessage = {
    sender: 'bot',
    text: data.reply,
    recommendedProducts: data.recommendedProducts
  };
  
  setMessages([...messages, userMessage, botMessage]);
};
```

---

### **2. Backend Receives & Processes (Spring Boot)**

```java
// ChatbotController.java
@PostMapping("/chat")
public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
    // Request has: message = "show me cheap laptops"
    ChatResponse response = chatbotService.processChatMessage(request);
    return ResponseEntity.ok(response);
}
```

---

### **3. Chatbot Service Logic (The Brain)**

```java
// ChatbotService.java
public ChatResponse processChatMessage(ChatRequest request) {
    String inputMsg = request.getMessage(); // "show me cheap laptops"
    String lowerMsg = inputMsg.toLowerCase(); // convert to lowercase
    
    // RULE 1: Check for coupon keywords
    if (lowerMsg.contains("coupon") || lowerMsg.contains("discount")) {
        // Query database for active coupons
        List<Coupon> coupons = couponRepository.findAll()
            .stream()
            .filter(Coupon::isActive)
            .collect(Collectors.toList());
        
        // Build response with coupon list
        return new ChatResponse("Here are active coupons: ...", coupons);
    }
    
    // RULE 2: Check for order/tracking keywords
    if (lowerMsg.contains("order") || lowerMsg.contains("track")) {
        return new ChatResponse("You can track orders in My Orders page...");
    }
    
    // RULE 3: Check for return policy keywords
    if (lowerMsg.contains("return") || lowerMsg.contains("refund")) {
        return new ChatResponse("We offer 30-day returns...");
    }
    
    // RULE 4: Check for greeting
    if (lowerMsg.matches("^(hi|hello|hey).*")) {
        return new ChatResponse("Hello! How can I help?");
    }
    
    // RULE 5: Product search with price filtering
    
    // 5a. Extract maximum price if mentioned
    Double maxPrice = extractMaxPrice(lowerMsg); 
    // Looks for: "under $200", "below 500", "< 1000"
    // Returns: 200.0 or null
    
    // 5b. Get all products from database
    List<Product> allProducts = productRepo.findAll();
    
    // 5c. Filter products based on keywords
    List<Product> matched = allProducts.stream()
        .filter(product -> {
            // Check if product name/description/category contains keywords
            String pName = product.getName().toLowerCase();
            String pDesc = product.getDescription().toLowerCase();
            String pCategory = product.getCategory().toLowerCase();
            
            // Split user message into words: ["show", "me", "cheap", "laptops"]
            String[] tokens = lowerMsg.split("\\s+");
            
            for (String token : tokens) {
                // Skip stopwords (show, me, the, etc.)
                if (isStopWord(token)) continue;
                
                // Check if product matches this keyword
                if (pName.contains(token) || pDesc.contains(token) || pCategory.contains(token)) {
                    // Found a match!
                    
                    // Check price filter
                    if (maxPrice != null && product.getPrice() > maxPrice) {
                        return false; // Price too high, skip
                    }
                    
                    return true; // Include this product
                }
            }
            return false; // No match
        })
        .sorted((p1, p2) -> {
            // Sort by availability and rating
            return Double.compare(p2.getAverageRating(), p1.getAverageRating());
        })
        .limit(4) // Return max 4 products
        .collect(Collectors.toList());
    
    // 5d. Return response with matched products
    if (!matched.isEmpty()) {
        return new ChatResponse(
            "Here are top products matching your query:",
            matched, // Convert to RecommendedProduct DTOs
            ["Show more", "Any coupons?", "Compare prices"] // Suggestions
        );
    }
    
    // RULE 6: Fallback - No matches found
    // Return some popular products
    List<Product> topProducts = allProducts.stream()
        .filter(Product::isProductAvailable)
        .limit(3)
        .collect(Collectors.toList());
    
    return new ChatResponse(
        "I couldn't find exact matches. Here are popular products:",
        topProducts
    );
}
```

---

### **4. Price Extraction (Regex Pattern Matching)**

```java
private Double extractMaxPrice(String msg) {
    // Pattern to match: "under $200", "below 500", "< 1000"
    Pattern pattern = Pattern.compile(
        "(under|below|less than|<|budget|max)\\s*\\$?(\\d+)", 
        Pattern.CASE_INSENSITIVE
    );
    
    Matcher matcher = pattern.matcher(msg);
    
    if (matcher.find()) {
        // Found pattern! Extract the number
        String priceStr = matcher.group(2); // "200"
        return Double.parseDouble(priceStr); // 200.0
    }
    
    return null; // No price found
}
```

**Examples:**
- "headphones under $200" → Returns 200.0
- "laptop below 1000" → Returns 1000.0  
- "show me laptops" → Returns null (no price limit)

---

### **5. Stopword Filtering**

```java
private boolean isStopWord(String word) {
    Set<String> stopWords = Set.of(
        "show", "me", "the", "for", "with", "and", 
        "want", "need", "looking", "find"
    );
    return stopWords.contains(word);
}
```

**Why?** These common words don't help identify products.

**Example:**
- Input: "show me the best laptop"
- After filtering: ["best", "laptop"]
- Searches for products matching: "best" OR "laptop"

---

## 📊 Response Structure

### **ChatResponse Object:**

```java
public class ChatResponse {
    private String reply; // Text message from bot
    private List<RecommendedProduct> recommendedProducts; // Products to show
    private List<String> suggestedQuestions; // Quick reply buttons
}
```

### **Example Response:**

```json
{
  "reply": "Here are top laptops under $1000:",
  "recommendedProducts": [
    {
      "id": 5,
      "name": "Dell XPS 13",
      "brand": "Dell",
      "price": 899.99,
      "category": "Laptop",
      "averageRating": 4.5
    },
    {
      "id": 12,
      "name": "HP Pavilion",
      "brand": "HP",
      "price": 799.99,
      "category": "Laptop",
      "averageRating": 4.2
    }
  ],
  "suggestedQuestions": [
    "Show more laptops",
    "Any discount coupons?",
    "Compare prices"
  ]
}
```

---

## 🎨 Frontend Display

### **Message Bubble:**
```
┌─────────────────────────────┐
│ 🤖 AI Assistant            │
│                             │
│ Here are top laptops        │
│ under $1000:                │
│                             │
│ ┌──────┐ ┌──────┐          │
│ │ Dell │ │  HP  │          │
│ │ XPS  │ │Pavil.│          │
│ │$899  │ │$799  │          │
│ └──────┘ └──────┘          │
│                             │
│ ✨ Show more laptops        │
│ ✨ Any discount coupons?    │
└─────────────────────────────┘
```

---

## 🧪 Example Conversations

### **Example 1: Product Search**

**User:** "show me cheap laptops"

**Bot Logic:**
1. Detects: "laptop" keyword
2. No price limit specified
3. Queries: `SELECT * FROM products WHERE category LIKE '%laptop%'`
4. Sorts by price (ascending)
5. Returns top 4 laptops

**Bot Response:** "Here are affordable laptops:" + [4 laptop cards]

---

### **Example 2: Price Filter**

**User:** "headphones under $200"

**Bot Logic:**
1. Detects: "headphones" + "under" + "200"
2. Price limit: 200.0
3. Queries: `SELECT * FROM products WHERE category LIKE '%headphone%' AND price < 200`
4. Returns matching products

**Bot Response:** "Here are headphones under $200:" + [product cards]

---

### **Example 3: Coupon Query**

**User:** "any discount codes?"

**Bot Logic:**
1. Detects: "discount" keyword
2. Queries: `SELECT * FROM coupons WHERE is_active = true`
3. Formats coupon list

**Bot Response:**
```
🎟️ Available Coupons:
• WELCOME10 — 10% OFF
• SUMMER20 — 20% OFF
• FLAT50 — $50 OFF
```

---

### **Example 4: Order Tracking**

**User:** "how do I track my order?"

**Bot Logic:**
1. Detects: "track" + "order" keywords
2. Returns pre-written response (no database query)

**Bot Response:**
```
📦 Order Tracking:
• View orders in "My Orders" page
• Shipping takes 3-5 business days
• Check order status in your dashboard
```

---

## 🔧 How to Explain in Viva

### **Question: "How does your chatbot work?"**

**Perfect Answer:**

"My chatbot is a **rule-based intelligent system** that uses **pattern matching** and **keyword detection**. When a user types a message:

1. **It converts the message to lowercase** for case-insensitive matching
2. **Checks for specific keywords** like 'coupon', 'order', 'return', 'laptop', etc.
3. **Extracts price limits** using regex patterns (e.g., 'under $200')
4. **Queries the database** to fetch relevant products or coupons
5. **Filters products** by keywords and price
6. **Returns a response** with text, product recommendations, and suggested questions

For example, if a user says 'show me cheap laptops under $500':
- It detects: 'laptop' category + 'under $500' price
- Queries products WHERE category='Laptop' AND price < 500
- Returns top 4 laptops sorted by rating

It's **NOT using external AI APIs** like ChatGPT. It's a **local rule-based system** that searches my own product database."

---

### **Question: "Why not use real AI like ChatGPT?"**

**Perfect Answer:**

"I used a rule-based approach because:

1. **No API costs** - ChatGPT API costs money per request
2. **Privacy** - All data stays on my server, no external API calls
3. **Speed** - Local database queries are faster than API calls
4. **Control** - I can customize responses for my specific products
5. **Learning purpose** - Shows understanding of pattern matching and algorithms

**Future enhancement** would be to integrate ChatGPT API for more natural conversations, but current system works well for e-commerce product searches and FAQs."

---

### **Question: "What algorithms did you use?"**

**Perfect Answer:**

"I used several algorithms:

1. **Regex Pattern Matching** - To extract prices from text ('under $200' → 200)
2. **String Tokenization** - Split message into words and remove stopwords
3. **Text Matching** - Check if product name/description contains keywords
4. **Filtering** - Stream API to filter products by criteria
5. **Sorting** - Sort by rating and availability
6. **Limiting** - Return max 4 products for better UX

The core algorithm is a **keyword-based search** with **multi-field matching** (name, description, category, brand)."

---

## 💭 What Your Chatbot CAN Do:

✅ Search products by name/category  
✅ Filter products by price range  
✅ Show active discount coupons  
✅ Provide order tracking info  
✅ Explain return policy  
✅ Recommend popular products  
✅ Suggest quick questions  

---

## ❌ What Your Chatbot CANNOT Do:

❌ Understand complex natural language  
❌ Remember past conversations (no memory)  
❌ Answer questions outside predefined patterns  
❌ Learn from user interactions  
❌ Handle spelling mistakes well  
❌ Understand context or sarcasm  

---

## 🚀 Future Enhancements You Could Mention:

1. **Integrate ChatGPT API** for natural language understanding
2. **Add conversation memory** using session storage
3. **Implement sentiment analysis** to detect user frustration
4. **Add spell correction** using Levenshtein distance
5. **Machine learning recommendations** based on user behavior
6. **Voice input/output** using Web Speech API

---

## 📝 Key Points for Viva:

1. **It's rule-based, not real AI** - Be clear about this!
2. **Pattern matching with keywords** - Core technique
3. **Database-driven responses** - Searches your product database
4. **Regex for price extraction** - Show you understand regex
5. **No external API** - All local processing
6. **Good for e-commerce** - Focused on product discovery

---

## 🎯 Demo Flow for Viva:

1. **Open chatbot** - Click robot icon
2. **Type:** "show me laptops under $1000"
3. **Show response** - Bot returns laptop products
4. **Type:** "any coupons?"
5. **Show response** - Bot returns coupon codes
6. **Type:** "track my order"
7. **Show response** - Bot returns tracking info

**This proves your chatbot works!** 🚀

---

**Remember:** It's okay that it's not real AI. Rule-based systems are perfectly valid for e-commerce chatbots and show good understanding of algorithms!
