package com.example.demo.dto;

import java.time.LocalDateTime;

public record MeResponse(
        Long id,
        String name,
        String email,
        String role,
        String location,
        LocalDateTime createdAt
) {}