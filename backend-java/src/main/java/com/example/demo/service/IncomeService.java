package com.example.demo.service;

import com.example.demo.entity.Income;
import com.example.demo.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public Income addIncome(Income givenIncome){
        return incomeRepository.save(givenIncome);
    }

    public Income updateIncome(Income updated) {
        return incomeRepository.save(updated);
    }

    public void deleteIncome(Long expenseId){
        incomeRepository.deleteById(expenseId);
    }

    public List<Income> showAllIncomes(){
        return incomeRepository.findAll();
    }

    public BigDecimal fetchAllGivenIncomes(){
        List<Income> incomes = showAllIncomes();

        BigDecimal total = incomes.stream().map(Income::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return total;
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
