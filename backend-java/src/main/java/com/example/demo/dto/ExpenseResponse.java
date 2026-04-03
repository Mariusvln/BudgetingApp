package com.example.demo.dto;

import com.example.demo.entity.Category;
import com.example.demo.entity.PROCESS_TYPE;
import com.example.demo.entity.User;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseResponse {

    public Long user;

    public Long id;

    public String description;

    public BigDecimal amount;

    public LocalDate date;

    public Long category;

    public PROCESS_TYPE processType;

    public ExpenseResponse() {}

    public ExpenseResponse(Long user, String description, BigDecimal amount, LocalDate date, Long category, PROCESS_TYPE processType) {
        this.user = user;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }

}
