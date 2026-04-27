package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
@Entity
public class CategoryLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Getter
    @Setter
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @Getter
    @Setter
    private Category category;

    @Getter
    @Setter
    private BigDecimal maxLimit;

    public CategoryLimit(){}

    public CategoryLimit(User user, Category category, BigDecimal limit) {
        this.user = user;
        this.category = category;
        this.maxLimit = limit;
    }

}
