package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Income extends Categories{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private BigDecimal amount;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    @ManyToOne
//    @JoinColumn(name = "category_id")
//    private Category category;
    private int category;

    private PROCESS_TYPE processType;

    // private userid userid;

    // Constructors
    public Income() {}

    public Income(String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {return user;}

    public String getDescription() {
        return description;
    }

    public BigDecimal getAmount() {
        return amount;
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
        System.out.println("Now after called setAmount it's a " + this.amount);
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setUser(User user) {
        this.user = user;
        System.out.println("Now after called setUser it's a " + this.user);
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public void setProcessType(PROCESS_TYPE processType) {
        this.processType = processType;
    }
}
