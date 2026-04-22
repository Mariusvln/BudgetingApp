package com.example.demo.controller;

import com.example.demo.dto.DeleteAccountRequest;
import com.example.demo.dto.MeResponse;
import com.example.demo.dto.UpdateProfileRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserActivityService;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.example.demo.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@Valid
public class UserController {

    private final UserRepository userRepository;
    private final UserActivityService activityService;
    private final UserService userService;
    private final JwtService jwtService;

    @Value("${app.jwt.access-ttl-seconds:600}")
    private int accessTtlSeconds;

    @Value("${app.jwt.cookie.secure:true}")
    private boolean cookieSecure;

    @Value("${app.jwt.cookie.domain:}")
    private String cookieDomain;

    public UserController(UserRepository userRepository,
                          UserActivityService activityService,
                          UserService userService,
                          JwtService jwtService) {
        this.userRepository = userRepository;
        this.activityService = activityService;
        this.userService = userService;
        this.jwtService = jwtService;
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

    @PutMapping("/me")
    public MeResponse updateMyProfile(@Valid @RequestBody UpdateProfileRequest request,
                                      Authentication authentication,
                                      HttpServletResponse response) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String currentEmail = authentication.getName();

        try {
            User updated = userService.updateProfile(
                    currentEmail,
                    request.name(),
                    request.email(),
                    request.location()
            );

            String token = jwtService.generateAccessToken(updated.getEmail(), updated.getRole().name());
            addAccessTokenCookie(response, token);

            return new MeResponse(
                    updated.getId(),
                    updated.getName(),
                    updated.getEmail(),
                    updated.getRole().name(),
                    updated.getLocation(),
                    updated.getCreatedAt()
            );
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.findById(id).ifPresent(user -> {
            activityService.log(
                    user.getName() != null ? user.getName() : user.getEmail(),
                    user.getEmail(),
                    "Deleted user with id " + user.getId()
            );

            userRepository.deleteById(id);
        });
    }

    private void clearAccessTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("access_token", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        if (cookieDomain != null && !cookieDomain.isBlank()) {
            cookie.setDomain(cookieDomain);
        }

        response.addCookie(cookie);
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deleteMyAccount(@Valid @RequestBody DeleteAccountRequest request,
                                             Authentication authentication,
                                             HttpServletResponse response) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String currentEmail = authentication.getName();

        try {
            userService.deleteOwnAccount(currentEmail, request.password());

            clearAccessTokenCookie(response);

            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}