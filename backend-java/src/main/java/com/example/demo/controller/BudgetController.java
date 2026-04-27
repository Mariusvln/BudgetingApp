package com.example.demo.controller;

import com.example.demo.dto.CategoryLimitRequest;
import com.example.demo.dto.CategoryLimitResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.entity.CategoryLimit;
import com.example.demo.service.CategoryLimitService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/budget/")
@RequiredArgsConstructor
@Valid
public class BudgetController {

    private final CategoryLimitService categoryLimitService;

    private CategoryLimitResponse mapToDTO(CategoryLimit categoryLimit) {
        return new CategoryLimitResponse(
                categoryLimit.getId(),
                categoryLimit.getCategory().getId(),
                categoryLimit.getCategory().getName(),
                categoryLimit.getCategory().getType(),
                categoryLimit.getMaxLimit()
        );
    }

    private List<CategoryLimitResponse> mapToDTOs(List<CategoryLimit> categoryLimits) {
        return categoryLimits.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/")
    public RegisterResponse addCategoryLimit(@Valid @RequestBody CategoryLimitRequest categoryLimit, Authentication authentication) {
        System.out.println("getName for authentication is + " + authentication.getName());
        categoryLimitService.addCategoryLimit(authentication.getName(), categoryLimit);
        return new RegisterResponse("OK");
    }

    @PutMapping("/{id}")
    public RegisterResponse updateCategoryLimit(@PathVariable Long id, @Valid @RequestBody CategoryLimitRequest categoryLimit, Authentication authentication) {
        categoryLimitService.updateCategoryLimit(authentication.getName(), id, categoryLimit);
        return new RegisterResponse("OK");
    }

    @DeleteMapping("/{id}")
    public RegisterResponse deleteCategoryLimit(@PathVariable Long id, Authentication authentication) {
        categoryLimitService.deleteCategoryLimit(authentication.getName(), id);
        return new RegisterResponse("OK");
    }
    /// get
    // get all between the date by user email
    // count total
    // then use total as spent, and take like income=2000, total limit 1000, == result > 1000, if yes then response ok

//    @PostMapping("/")
//    public RegisterResponse addBudgetLimit(@Valid @RequestBody BudgetLimit budgetLimit, Authentication authentication) {
//        expenses.addExpense(authentication.getName(), expense);
//        return new RegisterResponse("OK");
//    }

    @GetMapping("/fetchAllCategoryLimits")
    public List<CategoryLimitResponse> getAllCategoryLimits() {
        List<CategoryLimit> categoryLimitList = categoryLimitService.showAllCategoryLimits();

        return mapToDTOs(categoryLimitList);
    }

    @GetMapping("/")
    public List<CategoryLimitResponse> getAllCategoryLimitsByUser(Authentication authentication) {
        List<CategoryLimit> categoryLimitList = categoryLimitService.fetchAllCategoryLimitsByUser(authentication.getName());

        return mapToDTOs(categoryLimitList);
    }

//    @PutMapping("/{id}")
//    public Category update(@PathVariable Long id, @Valid @RequestBody Category updated) {
//        Category cat = categoryRepository.findById(id).orElseThrow();
//        cat.setName(updated.getName());
//        cat.setType(updated.getType());
//        return categoryRepository.save(cat);
//    }
//
//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable Long id) {
//        categoryRepository.deleteById(id);
//    }
}
