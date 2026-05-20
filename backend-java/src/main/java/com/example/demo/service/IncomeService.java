package com.example.demo.service;

import com.example.demo.dto.IncomeRequest;
import com.example.demo.entity.Category;
import com.example.demo.entity.Income;
import com.example.demo.entity.Type;
import com.example.demo.entity.User;
import com.example.demo.exception.ForbiddenResourceAccessException;
import com.example.demo.exception.InvalidCategoryException;
import com.example.demo.exception.InvalidDateRangeException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.TransactionLimitExceededException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.IncomeRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private static final BigDecimal MAX_TOTAL_INCOME = new BigDecimal("4000000000");

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserActivityService activityService;

    public Income addIncome(Income givenIncome){
        return incomeRepository.save(givenIncome);
    }

    public Income addIncome(String email, IncomeRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Category category = validateIncomeCategory(request.getCategory());
        validateTotalLimit(user, null, request.getAmount());
        Income income = fromDTO(request, user);
        Income saved = incomeRepository.save(income);
        log(user, "Created income " + saved.getDescription() + " in " + category.getName() + ": " + saved.getAmount());
        return saved;
    }

    public Income fromDTO(IncomeRequest dto, User user) {
        Income income = new Income();
        income.setId(dto.getId());
        income.setDescription(dto.getDescription());
        income.setDate(dto.getDate());
        income.setCategory(dto.getCategory());
        income.setAmount(dto.getAmount());
        income.setProcessType(dto.getProcessType());
        income.setUser(user);
        return income;
    }

    public Income updateIncome(String email, IncomeRequest updated) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Income existing = incomeRepository.findById(updated.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Income", updated.getId()));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ForbiddenResourceAccessException("Income does not belong to user");
        }

        Category category = validateIncomeCategory(updated.getCategory());
        validateTotalLimit(user, existing, updated.getAmount());

        existing.setDescription(updated.getDescription());
        existing.setAmount(updated.getAmount());
        existing.setDate(updated.getDate());
        existing.setCategory(updated.getCategory());
        existing.setProcessType(updated.getProcessType());

        Income saved = incomeRepository.save(existing);
        log(user, "Updated income " + saved.getDescription() + " in " + category.getName() + ": " + saved.getAmount());
        return saved;
    }

    private void validateTotalLimit(User user, Income existingIncome, BigDecimal newAmount) {
        BigDecimal currentTotal = incomeRepository.findByUser(user).stream()
                .map(Income::getAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (existingIncome != null && existingIncome.getAmount() != null) {
            currentTotal = currentTotal.subtract(existingIncome.getAmount());
        }

        BigDecimal nextTotal = currentTotal.add(newAmount == null ? BigDecimal.ZERO : newAmount);
        if (nextTotal.compareTo(MAX_TOTAL_INCOME) > 0) {
            throw new TransactionLimitExceededException("income", MAX_TOTAL_INCOME.toPlainString());
        }
    }

    public void deleteIncome(String email, Long incomeId){
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Income existing = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new ResourceNotFoundException("Income", incomeId));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ForbiddenResourceAccessException("Income does not belong to user");
        }

        incomeRepository.delete(existing);
        log(user, "Deleted income " + existing.getDescription() + ": " + existing.getAmount());
    }


    public BigDecimal fetchAllGivenIncomes(){
        List<Income> incomes = showAllIncomes();

        BigDecimal total = incomes.stream().map(Income::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return total;
    }

    public List<Income> showAllIncomes(){
        return incomeRepository.findAll();
    }

    public List<Income>  fetchAllIncomesByUser(String email){
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        List<Income> incomes = incomeRepository.findByUser(user);


//        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return incomes;
    }

    // fetchIncomesByUserFromDateStartToDateEnd
    public List<Income> fetchIncomesByUserFromDateStartToDateEnd(String email, LocalDate dateStart, LocalDate dateEnd){
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        if (dateStart.isAfter(dateEnd)) {
            throw new InvalidDateRangeException();
        }
        List<Income> incomes = incomeRepository.findByUser(user);

        List<Income> filtered = new ArrayList<>();
        for (Income r : incomes) {
            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
                filtered.add(r);
            }
        }

        return filtered;
    }

    public List<Income> fetchAllGivenIncomesFromDateStartToDateEnd(LocalDate dateStart, LocalDate dateEnd){
        List<Income> incomes = showAllIncomes();

        List<Income> filtered = new ArrayList<>();
        for (Income r : incomes) {
            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
                filtered.add(r);
            }
        }

        return filtered;
    }


    private Category validateIncomeCategory(Integer categoryId) {
        Category category = categoryRepository.findById(Long.valueOf(categoryId))
                .orElseThrow(() -> new InvalidCategoryException("Category not found: " + categoryId));
        if (category.getType() != Type.INCOME) {
            throw new InvalidCategoryException("Income must use an INCOME category");
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
