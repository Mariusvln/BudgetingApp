package com.example.demo.repository;

import com.example.demo.entity.Category;
import com.example.demo.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findById(long category);

    Optional<Category> findByName(String name);

    Category save(Category givenCategory);

    List<Category> findAll();

    void deleteById(Long categoryId);
}
