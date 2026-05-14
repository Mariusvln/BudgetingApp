package com.example.demo.service;


import com.example.demo.dto.AdminCreateUserRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.EmailAlreadyUsedException;
import com.example.demo.exception.ForbiddenResourceAccessException;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private static final String DEFAULT_ADMIN_EMAIL = "admin@gmail.com";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserActivityService activityService;

    public AdminService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserActivityService activityService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.activityService = activityService;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public UserResponse createUser(AdminCreateUserRequest userRequest) {
        String email = userRequest.getEmail().trim();

        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyUsedException();
        }

        User user = new User();
        user.setName(userRequest.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(userRequest.getRole() == null ? Role.ROLE_USER : parseRole(userRequest.getRole()));

        User savedUser = userRepository.save(user);

        activityService.log(
                savedUser.getName(),
                savedUser.getEmail(),
                "Admin created user"
        );

        return toResponse(savedUser);
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

    return toResponse(savedUser);

}

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
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
