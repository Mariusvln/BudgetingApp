package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Income;
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
public class IncomeController {

    private final IncomeService incomes;

    @PostMapping("/addIncome")
    public RegisterResponse addIncome(@RequestBody Income income) {
        incomes.addIncome(income);
        return new RegisterResponse("OK");
    }

    public IncomeResponse mapToDTO(Income income) {
        return new IncomeResponse(income.getDescription(), income.getAmount(), income.getDate(), income.getCategory(), income.getProcessType());
    }

    public List<IncomeResponse> mapUsersToDTOs(List<Income> incomes) {
        return incomes.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/showAllIncomes")
    public List<IncomeResponse> showAllIncomes() {
        List<Income> resultIncomes = incomes.showAllIncomes();

        return mapUsersToDTOs(resultIncomes);
    }

    @GetMapping("/calculateIncomes")
    public RegisterResponse calculateIncomes() {
        BigDecimal total = incomes.calculateAllGivenIncomes();


        return new RegisterResponse(total.toString());
    }

    @GetMapping("/calculateIncomesFromDateStartToDateFinish")
    public List<Income> calculateIncomesFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd) {
        List<Income> total = incomes.calculateAllGivenIncomesFromDateStartToDateEnd(dateStart, dateEnd);

        return total;
    }


}


