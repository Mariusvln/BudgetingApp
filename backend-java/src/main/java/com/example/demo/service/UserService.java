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

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}