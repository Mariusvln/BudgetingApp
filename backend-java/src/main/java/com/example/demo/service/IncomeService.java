package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.entity.PROCESS_TYPE;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public Income addIncome(){
        Income income = new Income("Earned money from cutting grass", BigDecimal.valueOf(20), LocalDate.now(), 1, PROCESS_TYPE.SINGLE);
//        expense.set
//
//        User u=new User();
//        u.setEmail(email);
//        u.setPassword(encoder.encode(password));
//        u.setRole(Role.ROLE_USER);
//        return userRepository.save(u);
        return incomeRepository.save(income);
    }

    public List<Income> showAllIncomes(){
        return incomeRepository.findAll();
    }
}
