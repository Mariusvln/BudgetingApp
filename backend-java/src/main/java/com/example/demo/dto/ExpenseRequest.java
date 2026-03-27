package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseRequest {


    public Long id;

    public String description;

    public BigDecimal amount;

    public LocalDate date;

    public int category;

    public PROCESS_TYPE processType;

    public ExpenseRequest() {}

    public ExpenseRequest(String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }

}
