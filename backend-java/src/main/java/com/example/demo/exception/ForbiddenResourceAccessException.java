package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenResourceAccessException extends ApiException {
    public ForbiddenResourceAccessException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}