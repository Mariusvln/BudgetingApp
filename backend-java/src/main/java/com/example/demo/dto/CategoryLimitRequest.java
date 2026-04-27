package com.example.demo.dto;

import com.example.demo.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CategoryLimitRequest {

    public Long id;

    public Long category;

    public BigDecimal maxLimit;

    public CategoryLimitRequest(Long category, BigDecimal limit) {
        this.category = category;
        this.maxLimit = limit;
    }
}
