package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category")
    private List<Expense> expenses;

    // Constructors
    public Category() {}

    public Category(String name) {
        this.name = name;
    }

    // Getters and Setters
}