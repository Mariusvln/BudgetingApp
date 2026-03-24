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

import java.util.List;

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

    @GetMapping("/showAllExpenses")
    public List<Income> showAllIncomes() {
//        incomes.addIncome();
        List<Income> resultIncomes = incomes.showAllIncomes();
//        resultIncomes.stream().map(IncomeResponse);

        return incomes.showAllIncomes();
    }


}


