package com.example.demo.controller;

import com.example.demo.entity.UserActivity;
import com.example.demo.repository.UserActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserActivityController {

    private final UserActivityRepository repository;

    @GetMapping
    public List<UserActivity> getAll() {
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<UserActivity> search(@RequestParam String query) {
        String q = query == null ? "" : query.trim().toLowerCase();

        return repository.findAll().stream()
                .filter(activity -> {
                    String id = activity.getId() != null ? String.valueOf(activity.getId()).toLowerCase() : "";
                    String username = activity.getUsername() != null ? activity.getUsername().toLowerCase() : "";
                    String email = activity.getEmail() != null ? activity.getEmail().toLowerCase() : "";
                    String action = activity.getAction() != null ? activity.getAction().toLowerCase() : "";

                    return id.contains(q)
                            || username.contains(q)
                            || email.contains(q)
                            || action.contains(q);
                })
                .toList();
    }
}