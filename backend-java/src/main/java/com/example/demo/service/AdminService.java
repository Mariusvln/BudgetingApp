package com.example.demo.service;


import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.ForbiddenResourceAccessException;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private static final String DEFAULT_ADMIN_EMAIL = "admin@gmail.com";

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
     Role requestedRole = userRequest.getRole() == null ? user.getRole() : parseRole(userRequest.getRole());
     boolean isDefaultAdmin = DEFAULT_ADMIN_EMAIL.equalsIgnoreCase(user.getEmail());

     if (isDefaultAdmin && requestedRole != Role.ROLE_ADMIN) {
         throw new ForbiddenResourceAccessException("Default admin role cannot be changed");
     }

     if (isDefaultAdmin && !DEFAULT_ADMIN_EMAIL.equalsIgnoreCase(userRequest.getEmail())) {
         throw new ForbiddenResourceAccessException("Default admin email cannot be changed");
     }

     user.setName(userRequest.getName());
     user.setEmail(userRequest.getEmail());
     if (userRequest.getRole() != null) {
         user.setRole(requestedRole);
     }
     User savedUser = userRepository.save(user);

    return new UserResponse(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail(),
            savedUser.getRole().name()
    );

}

    private Role parseRole(String role) {
        String normalizedRole = role.trim().toUpperCase();

        if (!normalizedRole.startsWith("ROLE_")) {
            normalizedRole = "ROLE_" + normalizedRole;
        }

        return Role.valueOf(normalizedRole);
    }
}
