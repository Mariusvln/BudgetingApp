package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ApiException {
    public ResourceNotFoundException(String resourceType, Object id) {
        super(HttpStatus.NOT_FOUND, resourceType + " not found" + (id != null ? ": " + id : ""));
    }
}