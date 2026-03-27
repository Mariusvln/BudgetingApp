package com.example.demo.repository;

import com.example.demo.entity.Expense;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

//    @Query("""
//        SELECT c.name as categoryName, SUM(e.amount) as totalAmount
//        FROM Expense e
//        JOIN e.category c
//        WHERE e.date BETWEEN :startDate AND :endDate
//        GROUP BY c.name
//    """)
//    List<CategoryExpenseSummary> findTotalExpensesByCategory(
//            @Param("startDate") LocalDate startDate,
//            @Param("endDate") LocalDate endDate
//    );
}
