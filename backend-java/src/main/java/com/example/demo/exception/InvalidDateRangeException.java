package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class InvalidDateRangeException extends ApiException {
    public InvalidDateRangeException() {
        super(HttpStatus.BAD_REQUEST, "Invalid date range: start date must be <= end date");
    }
}