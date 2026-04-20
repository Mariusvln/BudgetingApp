package com.example.demo.service;


import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    public AdminService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
 public UserResponse updateUser(Long id, UserRequest userRequest) {
     User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

     user.setName(userRequest.getName());
     user.setEmail(userRequest.getEmail());
     if (userRequest.getRole() != null) {
         user.setRole(Role.valueOf(userRequest.getRole().toUpperCase()));
     }
     User savedUser = userRepository.save(user);

    return new UserResponse(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail(),
            savedUser.getRole().name()
    );

}}
