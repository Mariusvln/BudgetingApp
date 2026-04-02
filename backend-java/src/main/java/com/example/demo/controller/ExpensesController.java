package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.service.ExpenseService;
import com.example.demo.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/")
@RequiredArgsConstructor
public class ExpensesController {

    private final ExpenseService expenses;

    @PostMapping("/addExpense")
    public RegisterResponse addExpense(@RequestBody ExpenseRequest expense) {
        expenses.addIncome(expense);
        return new RegisterResponse("OK");
    }

    @DeleteMapping ("/deleteExpense")
    public RegisterResponse deleteExpense(@RequestParam Long expenseId) {
        expenses.addIncome(expenseId);
        return new RegisterResponse("OK");
    }

    public ExpenseResponse mapToDTO(Expense expense) {
        return new ExpenseResponse(expense.getUser().getId(),  expense.getDescription(), expense.getAmount(), expense.getDate(), expense.getCategory(), expense.getProcessType());
    }

    public List<ExpenseResponse> mapUsersToDTOs(List<Expense> expense) {
        return expense.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/showAllExpenses")
    public List<ExpenseResponse> showAllIncomes() {
        List<Expense> resultIncomes = expenses.showAllIncomes();

        return mapUsersToDTOs(resultIncomes);
    }

    @GetMapping("/calculateExpenses")
    public RegisterResponse calculateIncomes() {
        BigDecimal total = expenses.calculateAllGivenIncomes();


        return new RegisterResponse(total.toString());
    }

    @GetMapping("/calculateExpensesFromDateStartToDateFinish")
    public List<Expense> calculateIncomesFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd) {
        List<Expense> total = expenses.calculateAllGivenIncomesFromDateStartToDateEnd(dateStart, dateEnd);

        return total;
    }


}


