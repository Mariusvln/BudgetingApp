package com.example.demo.repository;

import com.example.demo.entity.CategoryLimit;
import com.example.demo.entity.Income;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryLimitRepository extends JpaRepository<CategoryLimit, Long> {

    List<CategoryLimit> findByUser(User user);
}