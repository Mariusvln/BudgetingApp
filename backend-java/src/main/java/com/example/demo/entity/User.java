package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Table(name = "app_users")
@Entity
public class User {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 @Column(unique = true)
 private String email;

 private String password;

 @Enumerated(EnumType.STRING)
 private Role role;

 private String name;

 private String location;

// @Column(nullable = false, updatable = false)
 private LocalDateTime createdAt;

 @PrePersist
 protected void onCreate() {
  this.createdAt = LocalDateTime.now();
 }

 public Long getId() { return id; }

 public String getEmail() { return email; }
 public void setEmail(String email) { this.email = email; }

 public String getPassword() { return password; }
 public void setPassword(String password) { this.password = password; }

 public Role getRole() { return role; }
 public void setRole(Role role) { this.role = role; }

 public String getName() { return name; }
 public void setName(String name) { this.name = name; }

 public String getLocation() { return location; }
 public void setLocation(String location) { this.location = location; }

 public LocalDateTime getCreatedAt() { return createdAt; }
 public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}