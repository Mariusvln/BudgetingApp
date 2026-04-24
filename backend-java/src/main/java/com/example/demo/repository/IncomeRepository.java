package com.example.demo.repository;

import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.entity.User;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    void deleteByUser(User user);
}