package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;

import java.math.BigDecimal;
import java.time.LocalDate;

public class IncomeRequest {


    public Long id;

    public String description;

    public BigDecimal amount;

    public LocalDate date;

    public int category;

    public PROCESS_TYPE processType;

    public IncomeRequest() {}

    public IncomeRequest(String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public void setProcessType(PROCESS_TYPE processType) {
        this.processType = processType;
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDate() {
        return date;
    }

    public int getCategory() {
        return category;
    }

    public PROCESS_TYPE getProcessType() {
        return processType;
    }

}
