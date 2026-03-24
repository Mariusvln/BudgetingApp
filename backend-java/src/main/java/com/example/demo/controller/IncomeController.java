package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Income;
import com.example.demo.entity.User;
import com.example.demo.service.IncomeService;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomes;
//    private final JwtService jwtService;

    @PostMapping("/addIncome")
    public RegisterResponse addIncome() {
        incomes.addIncome();
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
//        incomes.addIncome();
        List<Income> resultIncomes = incomes.showAllIncomes();

        //        resultIncomes.stream().map(IncomeResponse);

        return mapUsersToDTOs(resultIncomes);
    }


}


