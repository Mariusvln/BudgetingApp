package com.example.demo.repository;

import com.example.demo.entity.Expense;
import com.example.demo.entity.User;
import com.example.demo.entity.UserActivity;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.entity.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    void deleteByUser(User user);
}