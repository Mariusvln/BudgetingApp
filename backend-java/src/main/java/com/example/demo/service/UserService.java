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
 public User register(String email,String password){
   User u=new User();
   u.setEmail(email);
   u.setPassword(encoder.encode(password));
   u.setRole(Role.ROLE_USER);
   return userRepository.save(u);
 }
 public User authenticate(String email,String password){
   return userRepository.findByEmail(email)
     .filter(u->encoder.matches(password,u.getPassword()))
     .orElse(null);
 }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
