package com.example.demo.service;

import com.example.demo.dto.ExpenseRequest;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.entity.User;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public Expense addExpense(String email, ExpenseRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        Expense expense = fromDTO(request, user);
        return expenseRepository.save(expense);
    }

    public Expense fromDTO(ExpenseRequest dto, User user) {
        Expense expense = new Expense();
        expense.setId(dto.getId());
        expense.setDescription(dto.getDescription());
        expense.setDate(dto.getDate());
        expense.setCategory(dto.getCategory());
        expense.setAmount(dto.getAmount());
        expense.setProcessType(dto.getProcessType());
        expense.setUser(user);
        return expense;
    }

//    public Expense addIncome(ExpenseRequest givenExpenseRequest){
//        Expense expense = fromDTO(givenExpenseRequest);
//        return expenseRepository.save(expense);
//    }
    public Expense updateExpense(String email, Expense updated) {
        Expense existing = expenseRepository.findById(updated.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));

        existing.setDescription(updated.getDescription());
        existing.setAmount(updated.getAmount());
        existing.setDate(updated.getDate());
        existing.setCategory(updated.getCategory());
        existing.setProcessType(updated.getProcessType());

        return expenseRepository.save(existing);
}

    public void deleteExpense(Long expenseId){
        expenseRepository.deleteById(expenseId);
    }

    public BigDecimal fetchAllGivenExpenses(){
        List<Expense> expenses = showAllExpenses();

        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return total;
    }

    public List<Expense> showAllExpenses(){
        return expenseRepository.findAll();
    }

    public List<Expense>  fetchAllExpensesByUser(String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        List<Expense> expenses = expenseRepository.findByUser(user);


//        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return expenses;
    }

    // fetchExpensesByUserFromDateStartToDateEnd
    public List<Expense> fetchExpensesByUserFromDateStartToDateEnd(String email, LocalDate dateStart, LocalDate dateEnd){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        List<Expense> incomes = expenseRepository.findByUser(user);

        List<Expense> filtered = new ArrayList<>();
        for (Expense r : incomes) {
            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
                filtered.add(r);
            }
        }

        return filtered;
    }

    public List<Expense> fetchAllGivenExpensesFromDateStartToDateEnd(LocalDate dateStart, LocalDate dateEnd){
        List<Expense> incomes = showAllExpenses();

        List<Expense> filtered = new ArrayList<>();
        for (Expense r : incomes) {
            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
                filtered.add(r);
            }
        }

        return filtered;
    }

    public BigDecimal calculateAllGivenExpenses(List<Expense> expenses){
        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return total;
    }

    public List<Expense> fetchExpensesBySearch(String searchTitle){
        return showAllExpenses().stream()
                .filter(e -> e.getDescription().toLowerCase().contains(searchTitle.toLowerCase()))
                .collect(Collectors.toList());
    }


}
