package com.example.demo.repository;

import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.entity.User;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findByUser(User user);

    void deleteByUser(User user);
}
