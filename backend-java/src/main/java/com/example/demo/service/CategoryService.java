package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category addCategory(Category givenCategory){
        return categoryRepository.save(givenCategory);
    }
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }
    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }

    public List<Category> showAllCategories() { return categoryRepository.findAll();
    }

    public void deleteCategory(Long categoryId){
        categoryRepository.deleteById(categoryId);
    }
}