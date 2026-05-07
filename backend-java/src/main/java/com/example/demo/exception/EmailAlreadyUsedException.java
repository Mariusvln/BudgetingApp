package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class EmailAlreadyUsedException extends ApiException {
    public EmailAlreadyUsedException() {
        super(HttpStatus.CONFLICT, "Email is already in use");
    }
}