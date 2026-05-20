package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryLimitRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.UserActivityService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@Valid
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final CategoryLimitRepository categoryLimitRepository;
    private final UserActivityService activityService;

    public CategoryController(CategoryRepository categoryRepository,
                              CategoryLimitRepository categoryLimitRepository,
                              UserActivityService activityService) {
        this.categoryRepository = categoryRepository;
        this.categoryLimitRepository = categoryLimitRepository;
        this.activityService = activityService;
    }

    @GetMapping
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @PostMapping
    public Category create(@Valid @RequestBody Category category, Authentication authentication) {
        Category saved = categoryRepository.save(category);
        logAdminAction(authentication, "Created category " + saved.getName() + " (" + saved.getType() + ")");
        return saved;
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @Valid @RequestBody Category updated, Authentication authentication) {
        Category cat = categoryRepository.findById(id).orElseThrow();
        String oldName = cat.getName();
        String oldType = String.valueOf(cat.getType());
        cat.setName(updated.getName());
        cat.setType(updated.getType());
        Category saved = categoryRepository.save(cat);
        logAdminAction(authentication, "Updated category " + oldName + " (" + oldType + ") to " + saved.getName() + " (" + saved.getType() + ")");
        return saved;
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void delete(@PathVariable Long id, Authentication authentication) {
        Category category = categoryRepository.findById(id).orElseThrow();
        categoryLimitRepository.deleteByCategory(category);
        categoryRepository.delete(category);
        logAdminAction(authentication, "Deleted category " + category.getName() + " (" + category.getType() + ")");
    }

    private void logAdminAction(Authentication authentication, String action) {
        String email = authentication == null ? "unknown" : authentication.getName();
        activityService.log(email, email, action);
    }
}
