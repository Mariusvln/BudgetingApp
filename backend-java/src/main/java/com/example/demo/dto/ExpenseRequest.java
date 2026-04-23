package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class ExpenseRequest {

    private Long id;
    @Size(max = 50, message = "Description is too long")
    private String description;

    @NotNull
    @Positive(message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotNull
    private LocalDate date;

    @NotNull
    @Positive(message = "Category must be a valid id")
    private Integer category;

    @NotNull
    private PROCESS_TYPE processType;

    public ExpenseRequest(String description, BigDecimal amount, LocalDate date, Integer category, PROCESS_TYPE processType) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }
}