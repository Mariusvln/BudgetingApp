package com.example.demo.service;

import com.example.demo.dto.ExpenseRequest;
import com.example.demo.dto.IncomeRequest;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.entity.User;
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

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    public Income addIncome(Income givenIncome){
        return incomeRepository.save(givenIncome);
    }

    public Income addIncome(String email, IncomeRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));;
        Income income = fromDTO(request, user);
        return incomeRepository.save(income);
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

    public Income updateIncome(String email, Income updated) {
        Income existing = incomeRepository.findById(updated.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Income not found"));


        existing.setDescription(updated.getDescription());
        existing.setAmount(updated.getAmount());
        existing.setDate(updated.getDate());
        existing.setCategory(updated.getCategory());
        existing.setProcessType(updated.getProcessType());

        return incomeRepository.save(existing);
    }

    public void deleteIncome(Long incomeId){
        incomeRepository.deleteById(incomeId);
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
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        List<Income> incomes = incomeRepository.findByUser(user);


//        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return incomes;
    }

    // fetchIncomesByUserFromDateStartToDateEnd
    public List<Income> fetchIncomesByUserFromDateStartToDateEnd(String email, LocalDate dateStart, LocalDate dateEnd){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
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


}
