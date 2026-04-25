package com.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @NotEmpty(message = "Name" + emptyOrNull)
        @Size(max = 53, message = "Username cannot have more than 53 characters")
        String name,
        @NotEmpty(message = "Email" + emptyOrNull)
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Invalid email address")
        @Size(max = 254, message = "Email address is tool long to exist")
        String email,
        String location) {
        private static final String emptyOrNull = " must not be empty or null";
}