package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
public class IncomeRequest {

    private Long id;

    private String description;

    @NotNull
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotNull
    private LocalDate date;

    @NotNull
    @Positive(message = "Category must be a valid id")
    private Integer category;

    @NotNull
    private PROCESS_TYPE processType;

    public IncomeRequest(String description, BigDecimal amount, LocalDate date, Integer category, PROCESS_TYPE processType) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }
}