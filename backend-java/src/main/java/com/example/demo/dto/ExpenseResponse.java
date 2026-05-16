package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@NoArgsConstructor
public class ExpenseResponse {

    public Long user;

    public Long id;

    public String description;

    public BigDecimal amount;

    public LocalDate date;

    public int category;

    public PROCESS_TYPE processType;

    public ExpenseResponse(Long user, Long id, String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType) {
        this.user = user;
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }

}
