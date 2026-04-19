package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "user_activity")
public class UserActivity {

    // getters / setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String username;
    private String email;
    private String action;

    private LocalDateTime timestamp;

    public UserActivity() {
        this.timestamp = LocalDateTime.now();
    }

    public void setEmail(String email) { this.email = email; }

    public void setAction(String action) { this.action = action; }

}