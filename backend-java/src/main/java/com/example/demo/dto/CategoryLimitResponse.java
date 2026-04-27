package com.example.demo.dto;

import com.example.demo.entity.Type;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CategoryLimitResponse {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private Type categoryType;

    private BigDecimal maxLimit;

    public CategoryLimitResponse(Long id, Long categoryId, String categoryName, Type categoryType, BigDecimal maxLimit) {
        this.id = id;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.maxLimit = maxLimit;
    }

    public CategoryLimitResponse() {
    }
}
