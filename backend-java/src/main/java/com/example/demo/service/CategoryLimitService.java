package com.example.demo.service;

import com.example.demo.dto.CategoryLimitRequest;
import com.example.demo.entity.Category;
import com.example.demo.entity.CategoryLimit;
import com.example.demo.entity.Type;
import com.example.demo.entity.User;
import com.example.demo.exception.ForbiddenResourceAccessException;
import com.example.demo.exception.InvalidCategoryException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.CategoryLimitRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryLimitService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    private final CategoryLimitRepository categoryLimitRepository;
    private final UserActivityService activityService;

    public CategoryLimit fromDTO(CategoryLimitRequest dto, User user) {
        CategoryLimit categoryLimit = new CategoryLimit();
        categoryLimit.setUser(user);
        Category category = categoryRepository.findById(dto.getCategory())
                .orElseThrow(() -> new InvalidCategoryException("Category not found: " + dto.getCategory()));
        categoryLimit.setCategory(category);
        categoryLimit.setMaxLimit(dto.getMaxLimit());

        return categoryLimit;
    }

    public CategoryLimit addCategoryLimit(String email, CategoryLimitRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Category category = categoryRepository.findById(request.getCategory())
                .orElseThrow(() -> new InvalidCategoryException("Category not found: " + request.getCategory()));
        if (category.getType() != Type.EXPENSE) {
            throw new InvalidCategoryException("Budget limit must use an EXPENSE category");
        }
        categoryLimitRepository.findByUserAndCategory(user, category).ifPresent(existing -> {
            throw new InvalidCategoryException("Budget limit already exists for category: " + category.getName());
        });
        CategoryLimit categoryLimit = fromDTO(request, user);
        CategoryLimit saved = categoryLimitRepository.save(categoryLimit);
        log(user, "Created budget limit for " + saved.getCategory().getName() + ": " + saved.getMaxLimit());
        return saved;
    }

    public CategoryLimit updateCategoryLimit(String email, Long id, CategoryLimitRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
        CategoryLimit existing = categoryLimitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category limit", id));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ForbiddenResourceAccessException("Category limit does not belong to user");
        }

        existing.setMaxLimit(request.getMaxLimit());
        CategoryLimit saved = categoryLimitRepository.save(existing);
        log(user, "Updated budget limit for " + saved.getCategory().getName() + ": " + saved.getMaxLimit());
        return saved;
    }

    public void deleteCategoryLimit(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
        CategoryLimit existing = categoryLimitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category limit", id));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ForbiddenResourceAccessException("Category limit does not belong to user");
        }

        categoryLimitRepository.delete(existing);
        log(user, "Deleted budget limit for " + existing.getCategory().getName());
    }

    public List<CategoryLimit> showAllCategoryLimits(){
        return categoryLimitRepository.findAll();
    }

    public List<CategoryLimit>  fetchAllCategoryLimitsByUser(String email){
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        List<CategoryLimit> listOfCategoryLimits = categoryLimitRepository.findByUser(user);


//        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return listOfCategoryLimits;
    }

    private void log(User user, String action) {
        activityService.log(
                user.getName() != null ? user.getName() : user.getEmail(),
                user.getEmail(),
                action
        );
    }

//    public List<CategoryLimit> fetchAllGivenCategorieLimitsFromDateStartToDateEnd(LocalDate dateStart, LocalDate dateEnd){
//        List<CategoryLimit> incomes = showAllCategoryLimits();
//
//        List<CategoryLimit> filtered = new ArrayList<>();
//        for (CategoryLimit r : incomes) {
//            if (!r.getDate().isBefore(dateStart) && !r.getDate().isAfter(dateEnd)) {
//                filtered.add(r);
//            }
//        }
//
//        return filtered;
//    }
}
