package com.example.demo.service;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.EmailAlreadyUsedException;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.CategoryLimitRepository;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryLimitRepository categoryLimitRepository;
    private final PasswordEncoder encoder;
    private final UserActivityService activityService;

    private static final String DEFAULT_ADMIN_EMAIL = "admin@gmail.com";

    public User register(String name, String email, String password) {
        String normalizedEmail = email.trim();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new EmailAlreadyUsedException();
        }

        User u = new User();
        u.setName(name);
        u.setEmail(normalizedEmail);
        u.setPassword(encoder.encode(password));
        u.setRole(resolveRoleForNewUser(normalizedEmail));
        u.setCurrency("EUR");

        User saved = userRepository.save(u);

        activityService.log(
                saved.getName(),
                saved.getEmail(),
                "User registered"
        );

        return saved;
    }

    private Role resolveRoleForNewUser(String email) {
        if (DEFAULT_ADMIN_EMAIL.equalsIgnoreCase(email)) {
            return Role.ROLE_ADMIN;
        }

        return userRepository.countByEmailNot(DEFAULT_ADMIN_EMAIL) == 0
                ? Role.ROLE_ADMIN
                : Role.ROLE_USER;
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email.trim())
                .filter(u -> encoder.matches(password, u.getPassword()))
                .orElse(null);

        if (user != null) {
            activityService.log(
                    user.getName() != null ? user.getName() : user.getEmail(),
                    user.getEmail(),
                    "User logged in"
            );
        }

        return user;
    }

    public User updateProfile(String currentEmail, String newName, String newEmail, String newLocation, String newCurrency) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(UserNotFoundException::new);

        String oldName = user.getName();
        String oldEmail = user.getEmail();
        String oldLocation = user.getLocation();
        String oldCurrency = user.getCurrency();

        if (newEmail != null && !newEmail.trim().equalsIgnoreCase(user.getEmail())) {
            boolean emailTaken = userRepository.existsByEmail(newEmail.trim());
            if (emailTaken) {
                throw new EmailAlreadyUsedException();
            }
            user.setEmail(newEmail.trim());
        }

        if (newName != null && !newName.isBlank()) {
            user.setName(newName.trim());
        }

        if (newLocation != null) {
            user.setLocation(newLocation.trim());
        }

        if (newCurrency != null && !newCurrency.isBlank()) {
            user.setCurrency(newCurrency.trim().toUpperCase());
        }

        User saved = userRepository.save(user);

        StringBuilder changes = new StringBuilder("Updated profile:");

        if (newName != null && !newName.trim().equals(oldName)) {
            changes.append(" name");
        }

        if (newEmail != null && !newEmail.trim().equalsIgnoreCase(oldEmail)) {
            changes.append(" email");
        }

        if (newLocation != null) {
            String normalizedOldLocation = oldLocation == null ? "" : oldLocation.trim();
            String normalizedNewLocation = newLocation.trim();

            if (!normalizedNewLocation.equals(normalizedOldLocation)) {
                changes.append(" location");
            }
        }

        if (newCurrency != null && !newCurrency.trim().equalsIgnoreCase(oldCurrency)) {
            changes.append(" currency");
        }

        if (changes.toString().equals("Updated profile:")) {
            changes.append(" no changes");
        }

        activityService.log(
                saved.getName() != null ? saved.getName() : saved.getEmail(),
                saved.getEmail(),
                changes.toString()
        );

        return saved;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void logLogout(User user) {
        activityService.log(
                user.getName() != null ? user.getName() : user.getEmail(),
                user.getEmail(),
                "User logged out"
        );
    }

    @Transactional
    public void deleteOwnAccount(String currentEmail, String password) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(UserNotFoundException::new);

        if (password == null || password.isBlank()) {
            throw new InvalidCredentialsException();
        }

        if (!encoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        activityService.log(
                user.getName() != null ? user.getName() : user.getEmail(),
                user.getEmail(),
                "User deleted own account"
        );

        categoryLimitRepository.deleteByUser(user);
        expenseRepository.deleteByUser(user);
        incomeRepository.deleteByUser(user);

        userRepository.delete(user);
    }
}
