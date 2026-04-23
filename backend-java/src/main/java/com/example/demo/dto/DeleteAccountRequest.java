package com.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record DeleteAccountRequest(
        @NotEmpty(message = "Password must not be empty or null")
        String password
) {}