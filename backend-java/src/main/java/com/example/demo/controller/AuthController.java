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
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService users;
    private final JwtService jwtService;

    @Value("${app.jwt.access-ttl-seconds:600}")
    private int accessTtlSeconds;

    @Value("${app.jwt.cookie.secure:true}")
    private boolean cookieSecure;

    @Value("${app.jwt.cookie.domain:}")
    private String cookieDomain;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            users.register(request.username(), request.email(), request.password());
            return ResponseEntity.ok(new RegisterResponse("OK"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User user = users.authenticate(request.email(), request.password());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad creds");
        }

        String token = jwtService.generateAccessToken(user.getEmail(), user.getRole().name());
        addAccessTokenCookie(response, token);

        return new LoginResponse("Logged in");
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(Authentication authentication, HttpServletResponse response) {

        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            User user = users.findByEmail(email).orElse(null);

            if (user != null) {
                users.logLogout(user);
            }
        }

        Cookie cookie = new Cookie("access_token", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public MeResponse me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String email = authentication.getName();
        User user = users.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        return new MeResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getLocation(),
                user.getCreatedAt()
        );
    }

    private void addAccessTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(accessTtlSeconds);

        if (cookieDomain != null && !cookieDomain.isBlank()) {
            cookie.setDomain(cookieDomain);
        }

        response.addCookie(cookie);
    }

}


