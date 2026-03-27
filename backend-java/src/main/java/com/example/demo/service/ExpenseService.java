package com.example.demo.service;

import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public Expense addIncome(Expense givenExpense){
        return expenseRepository.save(givenExpense);
    }

    public List<Expense> showAllIncomes(){
        return expenseRepository.findAll();
    }

    public BigDecimal calculateAllGivenIncomes(){
        List<Expense> incomes = showAllIncomes();

        BigDecimal total = incomes.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return total;
    }

    public List<Expense> calculateAllGivenIncomesFromDateStartToDateEnd(LocalDate dateStart, LocalDate dateEnd){
        List<Expense> incomes = showAllIncomes();

        List<Expense> filtered = new ArrayList<>();
        for (Expense r : incomes) {
            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
                filtered.add(r);
            }
        }

        return filtered;
    }


}
