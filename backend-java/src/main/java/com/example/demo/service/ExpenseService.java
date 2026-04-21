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
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));;
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
    public Expense updateExpense(Expense updated) {
    return expenseRepository.save(updated);
}

    public void deleteIncome(Long expenseId){
        expenseRepository.deleteById(expenseId);
    }

    public List<Expense> showAllIncomes(){
        return expenseRepository.findAll();
    }

    public BigDecimal fetchAllGivenIncomes(){
        List<Expense> incomes = showAllIncomes();

        BigDecimal total = incomes.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return total;
    }

    public List<Expense> fetchAllGivenIncomesFromDateStartToDateEnd(LocalDate dateStart, LocalDate dateEnd){
        List<Expense> incomes = showAllIncomes();

        List<Expense> filtered = new ArrayList<>();
        for (Expense r : incomes) {
            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
                filtered.add(r);
            }
        }

        return filtered;
    }
    public List<Expense> fetchExpensesBySearch(String searchTitle){
        return showAllIncomes().stream()
                .filter(e -> e.getDescription().toLowerCase().contains(searchTitle.toLowerCase()))
                .collect(Collectors.toList());
    }


}
