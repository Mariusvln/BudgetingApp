package com.example.demo.service;

import com.example.demo.entity.UserActivity;
import com.example.demo.repository.UserActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserActivityService {

    private final UserActivityRepository repository;

    public void log(String username, String email, String action) {
        UserActivity activity = new UserActivity();
        activity.setUsername(username);
        activity.setEmail(email);
        activity.setAction(action);

        repository.save(activity);
    }
}