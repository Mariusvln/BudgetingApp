package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserActivityService activityService;

    public User register(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already in use");
        }

        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(encoder.encode(password));
        u.setRole(Role.ROLE_USER);

        User saved = userRepository.save(u);

        activityService.log(
                saved.getName(),
                saved.getEmail(),
                "User registered"
        );

        return saved;
    }

    public User authenticate(String email,String password){
        User user = userRepository.findByEmail(email)
                .filter(u->encoder.matches(password,u.getPassword()))
                .orElse(null);

        if (user != null) {
            activityService.log(
                    user.getName() != null ? user.getName() : user.getEmail(),
                    user.getEmail(),
                    "User logged in"
            );
        }

        return user;
    }

    public User updateProfile(String currentEmail, String newName, String newEmail, String newLocation) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (newEmail != null && !newEmail.equalsIgnoreCase(user.getEmail())) {
            boolean emailTaken = userRepository.existsByEmail(newEmail);
            if (emailTaken) {
                throw new RuntimeException("Email is already in use");
            }
            user.setEmail(newEmail);
        }

        if (newName != null && !newName.isBlank()) {
            user.setName(newName.trim());
        }

        if (newLocation != null) {
            user.setLocation(newLocation.trim());
        }

        User saved = userRepository.save(user);

        activityService.log(
                saved.getName(),
                saved.getEmail(),
                "Updated profile information"
        );

        return saved;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}