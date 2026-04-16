package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.service.ExpenseService;
import com.example.demo.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/")
@RequiredArgsConstructor
public class ExpensesController {

    private final ExpenseService expenses;

    @PostMapping("/addExpense")
    public RegisterResponse addExpense(@RequestBody ExpenseRequest expense) {
        expenses.addIncome(expense);
        return new RegisterResponse("OK");
    }

    @DeleteMapping ("/deleteExpense")
    public RegisterResponse deleteExpense(@RequestParam Long expenseId) {
        expenses.deleteIncome(expenseId);
        return new RegisterResponse("OK");
    }

    public ExpenseResponse mapToDTO(Expense expense) {
        return new ExpenseResponse(expense.getUser().getId(),  expense.getDescription(), expense.getAmount(), expense.getDate(), expense.getCategory(), expense.getProcessType());
    }

    public List<ExpenseResponse> mapUsersToDTOs(List<Expense> expense) {
        return expense.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/showAllExpenses")
    public List<ExpenseResponse> showAllIncomes() {
        List<Expense> resultIncomes = expenses.showAllIncomes();

        return mapUsersToDTOs(resultIncomes);
    }

    @GetMapping("/calculateExpenses")
    public RegisterResponse calculateIncomes() {
        BigDecimal total = expenses.fetchAllGivenIncomes();


        return new RegisterResponse(total.toString());
    }

    @GetMapping("/fetchExpensesFromDateStartToDateFinish")
    public List<Expense> fetchIncomesFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd) {
        List<Expense> total = expenses.fetchAllGivenIncomesFromDateStartToDateEnd(dateStart, dateEnd);

        return total;
    }
@GetMapping("/searchExpenses")
    public List<ExpenseResponse> fetchExpensesBySearch(@RequestParam String title) {
       
        List<Expense> filteredExpenses = expenses.fetchExpensesBySearch(title);
        return mapUsersToDTOs(filteredExpenses);
    }



    @GetMapping("/export")
    public void exportExpenses(
            @RequestParam(defaultValue = "csv") String type,
            HttpServletResponse response
    ) throws IOException {

        List<Expense> expensesList = expenses.showAllIncomes();

        if (type.equalsIgnoreCase("excel")) {
            exportExcel(expensesList, response);
        } else {
            exportCSV(expensesList, response);
        }
    }

    private void exportCSV(List<Expense> expensesList, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=expenses.csv");

        PrintWriter writer = response.getWriter();
        writer.println("Date,Category,Amount,Description");

        for (Expense e : expensesList) {
            writer.println(
                    e.getDate() + " , " +
                            e.getCategory() + " , " +
                            e.getAmount() + " , " +
                            e.getDescription()
            );
        }

        writer.flush();
    }

    private void exportExcel(List<Expense> expensesList, HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Expenses");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Date");
        header.createCell(1).setCellValue("Category");
        header.createCell(2).setCellValue("Amount");
        header.createCell(3).setCellValue("Description");

        int rowNum = 1;
        for (Expense e : expensesList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(e.getDate().toString());
            row.createCell(1).setCellValue(e.getCategory());
            row.createCell(2).setCellValue(e.getAmount().doubleValue());
            row.createCell(3).setCellValue(e.getDescription());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}


