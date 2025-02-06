package com.library.backend.controller;

import com.library.backend.entity.Book;
import com.library.backend.entity.Message;
import com.library.backend.requestmodels.AdminQuestionRequest;
import com.library.backend.service.MessageService;
import com.library.backend.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/search/findByUserEmail")
    public Page<Message> findByUserEmail(
            @RequestParam(value = "userEmail") String userEmail,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return messageService.findByUserEmail(userEmail, pageable);
    }

    @GetMapping("/search/findByClosed")
    public Page<Message> findByClosed(
            @RequestParam(value = "closed") boolean closed,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return messageService.findByClosed(closed, pageable);
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null ||!admin.equals("admin")){
            throw new Exception("Administration page only.");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }
}
