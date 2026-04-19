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
        return repository.findAll().stream()
                .filter(a ->
                        a.getUsername().toLowerCase().contains(query.toLowerCase()) ||
                                a.getEmail().toLowerCase().contains(query.toLowerCase()) ||
                                String.valueOf(a.getId()).contains(query)
                )
                .toList();
    }
}