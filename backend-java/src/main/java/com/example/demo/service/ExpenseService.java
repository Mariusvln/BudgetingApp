package com.example.demo.service;

import com.example.demo.dto.ExpenseRequest;
import com.example.demo.entity.Category;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Type;
import com.example.demo.entity.User;
import com.example.demo.exception.ForbiddenResourceAccessException;
import com.example.demo.exception.InvalidCategoryException;
import com.example.demo.exception.InvalidDateRangeException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.TransactionLimitExceededException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ExpenseRepository;
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

    private static final BigDecimal MAX_TOTAL_EXPENSES = new BigDecimal("4000000000");

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserActivityService activityService;

    public Expense addExpense(String email, ExpenseRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Category category = validateExpenseCategory(request.getCategory());
        validateTotalLimit(user, null, request.getAmount());
        Expense expense = fromDTO(request, user);
        Expense saved = expenseRepository.save(expense);
        log(user, "Created expense " + saved.getDescription() + " in " + category.getName() + ": " + saved.getAmount());
        return saved;
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
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Expense existing = expenseRepository.findById(updated.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expense", updated.getId()));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ForbiddenResourceAccessException("Expense does not belong to user");
        }

        Category category = validateExpenseCategory(updated.getCategory());
        validateTotalLimit(user, existing, updated.getAmount());

        existing.setDescription(updated.getDescription());
        existing.setAmount(updated.getAmount());
        existing.setDate(updated.getDate());
        existing.setCategory(updated.getCategory());
        existing.setProcessType(updated.getProcessType());

        Expense saved = expenseRepository.save(existing);
        log(user, "Updated expense " + saved.getDescription() + " in " + category.getName() + ": " + saved.getAmount());
        return saved;
}

    private void validateTotalLimit(User user, Expense existingExpense, BigDecimal newAmount) {
        BigDecimal currentTotal = expenseRepository.findByUser(user).stream()
                .map(Expense::getAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (existingExpense != null && existingExpense.getAmount() != null) {
            currentTotal = currentTotal.subtract(existingExpense.getAmount());
        }

        BigDecimal nextTotal = currentTotal.add(newAmount == null ? BigDecimal.ZERO : newAmount);
        if (nextTotal.compareTo(MAX_TOTAL_EXPENSES) > 0) {
            throw new TransactionLimitExceededException("expenses", MAX_TOTAL_EXPENSES.toPlainString());
        }
    }

    public void deleteExpense(String email, Long expenseId){
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Expense existing = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense", expenseId));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ForbiddenResourceAccessException("Expense does not belong to user");
        }

        expenseRepository.delete(existing);
        log(user, "Deleted expense " + existing.getDescription() + ": " + existing.getAmount());
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
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        List<Expense> expenses = expenseRepository.findByUser(user);


//        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return expenses;
    }

    // fetchExpensesByUserFromDateStartToDateEnd
    public List<Expense> fetchExpensesByUserFromDateStartToDateEnd(String email, LocalDate dateStart, LocalDate dateEnd){
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        if (dateStart.isAfter(dateEnd)) {
            throw new InvalidDateRangeException();
        }
        List<Expense> expenses = expenseRepository.findByUser(user);

        List<Expense> filtered = new ArrayList<>();
        for (Expense r : expenses) {
            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
                filtered.add(r);
            }
        }

        return filtered;
    }

    public List<Expense> fetchAllGivenExpensesFromDateStartToDateEnd(LocalDate dateStart, LocalDate dateEnd){
        List<Expense> expenses = showAllExpenses();

        List<Expense> filtered = new ArrayList<>();
        for (Expense r : expenses) {
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

    public List<Expense> fetchExpensesBySearch(String email, String searchTitle){
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        return expenseRepository.findByUser(user).stream()
                .filter(e -> e.getDescription().toLowerCase().contains(searchTitle.toLowerCase()))
                .collect(Collectors.toList());
    }

    private Category validateExpenseCategory(Integer categoryId) {
        Category category = categoryRepository.findById(Long.valueOf(categoryId))
                .orElseThrow(() -> new InvalidCategoryException("Category not found: " + categoryId));
        if (category.getType() != Type.EXPENSE) {
            throw new InvalidCategoryException("Expense must use an EXPENSE category");
        }
        return category;
    }

    private void log(User user, String action) {
        activityService.log(
                user.getName() != null ? user.getName() : user.getEmail(),
                user.getEmail(),
                action
        );
    }

}
