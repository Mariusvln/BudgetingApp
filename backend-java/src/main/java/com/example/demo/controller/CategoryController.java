package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Category;
import com.example.demo.entity.Expense;
import com.example.demo.service.CategoryService;
import com.example.demo.service.ExpenseService;
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
public class CategoryController {

    private final CategoryService categories;

    @PostMapping("/addCategory")
    public RegisterResponse addExpense(@RequestBody Category category) {
        categories.addCategory(category);
        return new RegisterResponse("OK");
    }

    @DeleteMapping ("/deleteCategory")
    public RegisterResponse deleteCategory(@RequestParam Long expenseId) {
        categories.deleteCategory(expenseId);
        return new RegisterResponse("OK");
    }

    @GetMapping("/showAllCategories")
    public List<Category> showAllCategories() {
        List<Category> resultIncomes = categories.showAllCategories();

        return resultIncomes;
    }



}


