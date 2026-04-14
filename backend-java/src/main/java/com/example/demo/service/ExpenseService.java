package com.example.demo.service;

import com.example.demo.dto.ExpenseRequest;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.entity.User;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Expense fromDTO(ExpenseRequest dto) {
        Expense expense = new Expense();
        expense.setId(dto.getId());
        expense.setDescription(dto.getDescription());
        expense.setDate(dto.getDate());
        expense.setCategory(dto.getCategory());
        expense.setAmount(dto.getAmount());

        System.out.println("User id is ->> " + dto.getUser());

        if (dto.getId() != null) {
//            User user = userRepository.findById(dto.getUser())
            User user = userRepository.findById(1L).get();
//                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            expense.setUser(user);
        }
        User user = userRepository.findById(1L).get();
        expense.setUser(user);

        System.out.println("Searched by id for user object and is ->> " + userRepository.findById(1L));
        System.out.println("User object is ->> " + expense.getUser());
        return expense;
    }

    public Expense addIncome(ExpenseRequest givenExpenseRequest){
        Expense expense = fromDTO(givenExpenseRequest);
        return expenseRepository.save(expense);
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
