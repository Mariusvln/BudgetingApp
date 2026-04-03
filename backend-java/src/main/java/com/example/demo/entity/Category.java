package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

//    @OneToMany(mappedBy = "category")
//    private List<Expense> expenses;
//    public CATEGORY_TYPE categoryType;

    // Constructors
    public Category() {}

    public Category(String name) {
        this.name = name;
//        this.CATEGORY_TYPE = categoryType;
    }

    public Long getId() {
        return id;
    }

    // Getters and Setters
}