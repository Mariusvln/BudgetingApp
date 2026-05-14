package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionOverviewResponse(
        String id,
        String transactionType,
        LocalDate date,
        String description,
        String categoryName,
        BigDecimal amount
) {}
