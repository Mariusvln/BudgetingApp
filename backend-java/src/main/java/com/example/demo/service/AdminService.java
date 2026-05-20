package com.example.demo.service;


import com.example.demo.dto.AdminCreateUserRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.EmailAlreadyUsedException;
import com.example.demo.exception.ForbiddenResourceAccessException;
import com.example.demo.repository.CategoryLimitRepository;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private static final String DEFAULT_ADMIN_EMAIL = "admin@gmail.com";

    private final UserRepository userRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryLimitRepository categoryLimitRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserActivityService activityService;

    public AdminService(UserRepository userRepository,
                        IncomeRepository incomeRepository,
                        ExpenseRepository expenseRepository,
                        CategoryLimitRepository categoryLimitRepository,
                        PasswordEncoder passwordEncoder,
                        UserActivityService activityService){
        this.userRepository = userRepository;
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.categoryLimitRepository = categoryLimitRepository;
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

    @Transactional
    public void deleteUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        if (DEFAULT_ADMIN_EMAIL.equalsIgnoreCase(user.getEmail())) {
            throw new ForbiddenResourceAccessException("Default admin cannot be deleted");
        }

        activityService.log(
                user.getName() != null ? user.getName() : user.getEmail(),
                user.getEmail(),
                "Admin deleted user"
        );
        categoryLimitRepository.deleteByUser(user);
        expenseRepository.deleteByUser(user);
        incomeRepository.deleteByUser(user);
        userRepository.delete(user);
    }

    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        Role requestedRole = userRequest.getRole() == null ? user.getRole() : parseRole(userRequest.getRole());
        boolean isDefaultAdmin = DEFAULT_ADMIN_EMAIL.equalsIgnoreCase(user.getEmail());
        String requestedEmail = userRequest.getEmail().trim();

        if (isDefaultAdmin && requestedRole != Role.ROLE_ADMIN) {
            throw new ForbiddenResourceAccessException("Default admin role cannot be changed");
        }

        if (isDefaultAdmin && !DEFAULT_ADMIN_EMAIL.equalsIgnoreCase(requestedEmail)) {
            throw new ForbiddenResourceAccessException("Default admin email cannot be changed");
        }

        if (!requestedEmail.equalsIgnoreCase(user.getEmail()) && userRepository.existsByEmail(requestedEmail)) {
            throw new EmailAlreadyUsedException();
        }

        user.setName(userRequest.getName().trim());
        user.setEmail(requestedEmail);
        if (userRequest.getRole() != null) {
            user.setRole(requestedRole);
        }
        User savedUser = userRepository.save(user);

        activityService.log(
                savedUser.getName(),
                savedUser.getEmail(),
                "Admin updated user"
        );

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
