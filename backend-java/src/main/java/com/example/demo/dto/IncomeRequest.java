package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
public class IncomeRequest {


    public Long id;

    public String description;
    @NotNull
    @NotEmpty
    public BigDecimal amount;
    @NotNull
    @NotEmpty
    public LocalDate date;
    @NotNull
    @NotEmpty
    @Pattern(regexp = "^([123])?")
    public int category;
    @NotNull
    @NotEmpty
    public PROCESS_TYPE processType;

    public IncomeRequest(String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }
}
