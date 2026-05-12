package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class InvalidCategoryException extends ApiException {
    public InvalidCategoryException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}