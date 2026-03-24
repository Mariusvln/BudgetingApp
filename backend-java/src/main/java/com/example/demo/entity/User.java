package com.example.demo.entity;
import jakarta.persistence.*;

@Table(name="app_users")
@Entity
public class User {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
 private Long id;
 @Column(unique=true)
 private String email;
 private String password;
 @Enumerated(EnumType.STRING)
 private Role role;
 public Long getId(){return id;}
 public String getEmail(){return email;}
 public void setEmail(String e){this.email=e;}
 public String getPassword(){return password;}
 public void setPassword(String p){this.password=p;}
 public Role getRole(){return role;}
 public void setRole(Role r){this.role=r;}
}
