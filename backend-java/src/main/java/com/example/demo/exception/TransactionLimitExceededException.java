package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class TransactionLimitExceededException extends ApiException {
    public TransactionLimitExceededException(String transactionType, String limit) {
        super(HttpStatus.BAD_REQUEST, "Total " + transactionType + " cannot exceed " + limit);
    }
}
