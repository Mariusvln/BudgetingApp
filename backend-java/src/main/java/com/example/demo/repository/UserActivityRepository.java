package com.example.demo.repository;

import com.example.demo.entity.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {

    List<UserActivity> findByUsernameContainingIgnoreCase(String username);
    List<UserActivity> findByEmailContainingIgnoreCase(String email);
}