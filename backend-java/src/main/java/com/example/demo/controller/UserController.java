package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;
    private final UserActivityService activityService;

    public UserController(UserRepository userRepository, UserActivityService activityService) {
        this.userRepository = userRepository;
        this.activityService = activityService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.findById(id).ifPresent(user -> {

            activityService.log(
                    user.getName(),
                    user.getEmail(),
                    "Deleted user with id " + user.getId()
            );

            userRepository.deleteById(id);
        });
    }
}