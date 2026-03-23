package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping("/user")
    public String user() {
        return "Hello USER";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String admin() {
        return "Hello ADMIN";
    }
}
