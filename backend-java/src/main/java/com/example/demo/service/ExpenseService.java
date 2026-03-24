package com.example.demo.service;

import com.example.demo.repository.CategoryExpenseSummary;
import com.example.demo.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<CategoryExpenseSummary> getExpensesByCategory(
            LocalDate startDate,
            LocalDate endDate) {

        return expenseRepository.findTotalExpensesByCategory(startDate, endDate);
    }
}
