package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;

import java.math.BigDecimal;
import java.time.LocalDate;

public class IncomeResponse {

    public Long user;

    public Long id;

    public String description;

    public BigDecimal amount;

    public LocalDate date;

    public int category;

    public PROCESS_TYPE processType;

    public IncomeResponse() {}

    public IncomeResponse(Long user, String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType) {
        this.user = user;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }

}
