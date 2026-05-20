package com.example.demo.dto;

import com.example.demo.entity.User;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CategoryLimitRequest {

    public Long id;

    @NotNull
    public Long category;

    @NotNull
    @DecimalMin(value = "0.01", message = "Limit cannot be less than 0.01")
    public BigDecimal maxLimit;

    public CategoryLimitRequest(Long category, BigDecimal limit) {
        this.category = category;
        this.maxLimit = limit;
    }
}
