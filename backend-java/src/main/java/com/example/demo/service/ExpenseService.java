package com.example.demo.service;

import com.example.demo.entity.Expense;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.CategoryExpenseSummary;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public void addExpense(String email, String password){
//        Expense expense = new Expense();
//        expense.set
//
//        User u=new User();
//        u.setEmail(email);
//        u.setPassword(encoder.encode(password));
//        u.setRole(Role.ROLE_USER);
//        return userRepository.save(u);
    }

//    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<CategoryExpenseSummary> getExpensesByCategory(
            LocalDate startDate,
            LocalDate endDate) {

        return expenseRepository.findTotalExpensesByCategory(startDate, endDate);
    }
}
