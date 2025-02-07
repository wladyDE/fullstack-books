package com.library.backend.controller;

import com.library.backend.requestmodels.AddBookRequest;
import com.library.backend.service.AdminService;
import com.library.backend.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token,
                         @RequestBody AddBookRequest addBookRequest) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null ||!admin.equals("admin")){
            throw new Exception("Administration page only.");
        }

        adminService.postBook(addBookRequest);
    }
}
