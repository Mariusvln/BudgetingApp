package com.example.demo.service;

import com.example.demo.dto.CategoryLimitRequest;
import com.example.demo.entity.CategoryLimit;
import com.example.demo.entity.User;
import com.example.demo.repository.CategoryLimitRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryLimitService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    private final CategoryLimitRepository categoryLimitRepository;

    public CategoryLimit fromDTO(CategoryLimitRequest dto, User user) {
        CategoryLimit categoryLimit = new CategoryLimit();
        categoryLimit.setUser(user);
        categoryLimit.setCategory(categoryRepository.findById(dto.getCategory()).get());
        categoryLimit.setMaxLimit(dto.getMaxLimit());

        return categoryLimit;
    }

    public CategoryLimit addCategoryLimit(String email, CategoryLimitRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        CategoryLimit categoryLimit = fromDTO(request, user);
        return categoryLimitRepository.save(categoryLimit);
    }

    public CategoryLimit updateCategoryLimit(String email, Long id, CategoryLimitRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        CategoryLimit existing = categoryLimitRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category limit not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Category limit does not belong to user");
        }

        existing.setMaxLimit(request.getMaxLimit());
        return categoryLimitRepository.save(existing);
    }

    public void deleteCategoryLimit(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        CategoryLimit existing = categoryLimitRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category limit not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Category limit does not belong to user");
        }

        categoryLimitRepository.delete(existing);
    }

    public List<CategoryLimit> showAllCategoryLimits(){
        return categoryLimitRepository.findAll();
    }

    public List<CategoryLimit>  fetchAllCategoryLimitsByUser(String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        List<CategoryLimit> listOfCategoryLimits = categoryLimitRepository.findByUser(user);


//        BigDecimal total = expenses.stream().map(Expense::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return listOfCategoryLimits;
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
