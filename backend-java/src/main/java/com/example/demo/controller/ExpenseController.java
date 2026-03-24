package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.MeResponse;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.entity.User;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/app/")
@RequiredArgsConstructor
public class ExpensesController {

    private final UserService users;
    private final JwtService jwtService;

    @PostMapping("/addExpense")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        users.register(request.email(), request.password());
        return new RegisterResponse("OK");
    }

//    @Value("${app.jwt.access-ttl-seconds:600}")
//    private int accessTtlSeconds;
//
//    @Value("${app.jwt.cookie.secure:true}")
//    private boolean cookieSecure;
//
//    @Value("${app.jwt.cookie.domain:}")
//    private String cookieDomain;
//
//    @PostMapping("/register")
//    public RegisterResponse register(@RequestBody RegisterRequest request) {
//        users.register(request.email(), request.password());
//        return new RegisterResponse("OK");
//    }
//
//    @PostMapping("/login")
//    public LoginResponse login(@RequestBody LoginRequest request, HttpServletResponse response) {
//        User user = users.authenticate(request.email(), request.password());
//        if (user == null) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad creds");
//        }
//
//        String token = jwtService.generateAccessToken(user.getEmail(), user.getRole().name());
//        addAccessTokenCookie(response, token);
//
//        return new LoginResponse("Logged in");
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<Void> logout(HttpServletResponse response) {
//
//        Cookie cookie = new Cookie("access_token", "");
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
//        cookie.setPath("/");
//        cookie.setMaxAge(0);
//
//        response.addCookie(cookie);
//        return ResponseEntity.noContent().build();
//    }
//
//    @GetMapping("/me")
//    public MeResponse me(Authentication authentication) {
//        if (authentication == null || !authentication.isAuthenticated()) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
//        }
//
//        String email = authentication.getName();
//        User user = users.findByEmail(email)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
//
//        return new MeResponse(
//                user.getId(),
//                user.getEmail(),
//                user.getRole().name()
//        );
//    }

//    private void addAccessTokenCookie(HttpServletResponse response, String token) {
//        Cookie cookie = new Cookie("access_token", token);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(cookieSecure);
//        cookie.setPath("/");
//        cookie.setMaxAge(accessTtlSeconds);
//
//        if (cookieDomain != null && !cookieDomain.isBlank()) {
//            cookie.setDomain(cookieDomain);
//        }
//
//        response.addCookie(cookie);
//    }

}


