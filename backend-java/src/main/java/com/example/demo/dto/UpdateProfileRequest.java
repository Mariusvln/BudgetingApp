package com.example.demo.dto;

public record UpdateProfileRequest(
        String name,
        String email,
        String location
) {}