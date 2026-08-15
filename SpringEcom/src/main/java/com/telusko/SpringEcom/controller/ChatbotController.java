package com.telusko.SpringEcom.controller;

import com.telusko.SpringEcom.dto.ChatRequest;
import com.telusko.SpringEcom.dto.ChatResponse;
import com.telusko.SpringEcom.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse response = chatbotService.processChatMessage(request);
        return ResponseEntity.ok(response);
    }
}
