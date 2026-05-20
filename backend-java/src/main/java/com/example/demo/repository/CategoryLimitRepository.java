package com.example.demo.repository;

import com.example.demo.entity.CategoryLimit;
import com.example.demo.entity.Category;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryLimitRepository extends JpaRepository<CategoryLimit, Long> {

    List<CategoryLimit> findByUser(User user);
    Optional<CategoryLimit> findByUserAndCategory(User user, Category category);
    void deleteByUser(User user);
    void deleteByCategory(Category category);
}
