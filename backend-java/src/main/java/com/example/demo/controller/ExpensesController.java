package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Category;
import com.example.demo.entity.Expense;
import com.example.demo.entity.Income;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.ExpenseService;
import com.example.demo.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/expenses/")
@RequiredArgsConstructor
@Valid
public class ExpensesController {

    private final ExpenseService expenses;
    private final IncomeService incomes;
    private final CategoryRepository categoryRepository;

    @PostMapping("/")
    public RegisterResponse addExpense(@Valid @RequestBody ExpenseRequest expense, Authentication authentication) {
        expenses.addExpense(authentication.getName(), expense);
        return new RegisterResponse("OK");
    }

    @PutMapping("/")
    public RegisterResponse updateExpense(@Valid @RequestBody Expense updated, Authentication authentication) {
        expenses.updateExpense(authentication.getName(), updated);
        return new RegisterResponse("OK");
    }

    @DeleteMapping ("/")
    public RegisterResponse deleteExpense(@Valid @RequestParam Long expenseId, Authentication authentication) {
        expenses.deleteExpense(authentication.getName(), expenseId);
        return new RegisterResponse("OK");
    }

    public ExpenseResponse mapToDTO(Expense expense) {
        return new ExpenseResponse(expense.getUser().getId(), expense.getId(), expense.getDescription(), expense.getAmount(), expense.getDate(), expense.getCategory(), expense.getProcessType());
    }

    public List<ExpenseResponse> mapUsersToDTOs(List<Expense> expense) {
        return expense.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/calculateExpenses")
    @PreAuthorize("hasRole('ADMIN')")
    public RegisterResponse calculateExpenses() {
        BigDecimal total = expenses.fetchAllGivenExpenses();


        return new RegisterResponse(total.toString());
    }

    @GetMapping("/showAllExpenses")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ExpenseResponse> showAllExpenses() {
        List<Expense> resultExpenses = expenses.showAllExpenses();

        return mapUsersToDTOs(resultExpenses);
    }

    @GetMapping("/fetchAllFromDateStartToDateFinish")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Expense> fetchExpensesFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd) {
        List<Expense> total = expenses.fetchAllGivenExpensesFromDateStartToDateEnd(dateStart, dateEnd);

        return total;
    }

    @GetMapping("/")
    public List<ExpenseResponse> fetchAllExpensesByUser(Authentication authentication) {
        List<Expense> resultExpenses = expenses.fetchAllExpensesByUser(authentication.getName());

        return mapUsersToDTOs(resultExpenses);
    }

    @GetMapping("/fromDateStartToDateFinish")
    public List<Expense> fetchExpensesByUserFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd, Authentication authentication) {
        List<Expense> total = expenses.fetchExpensesByUserFromDateStartToDateEnd(authentication.getName(), dateStart, dateEnd);

        return total;
    }

    @GetMapping("/searchExpenses")
    public List<ExpenseResponse> fetchExpensesBySearch(@RequestParam String title, Authentication authentication) {
       
        List<Expense> filteredExpenses = expenses.fetchExpensesBySearch(authentication.getName(), title);
        return mapUsersToDTOs(filteredExpenses);
    }



    @GetMapping("/export")
    public void exportExpenses(
            @RequestParam(defaultValue = "csv") String type,
            Authentication authentication,
            HttpServletResponse response
    ) throws IOException {

        List<Expense> expensesList = expenses.fetchAllExpensesByUser(authentication.getName());
        Map<Integer, String> categoryNames = getCategoryNames();

        if (type.equalsIgnoreCase("excel")) {
            exportExcel(expensesList, categoryNames, response);
        } else {
            exportCSV(expensesList, categoryNames, response);
        }
    }

    private void exportCSV(List<Expense> expensesList, Map<Integer, String> categoryNames, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=expenses.csv");

        PrintWriter writer = response.getWriter();
        writer.println("Date,Category,Amount,Description");

        for (Expense e : expensesList) {
            writer.println(toCsvRow(
                    e.getDate().toString(),
                    getCategoryName(categoryNames, e.getCategory()),
                    e.getAmount().toPlainString(),
                    e.getDescription()
            ));
        }

        writer.flush();
    }

    private void exportExcel(List<Expense> expensesList, Map<Integer, String> categoryNames, HttpServletResponse response) throws IOException {

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
            row.createCell(1).setCellValue(getCategoryName(categoryNames, e.getCategory()));
            row.createCell(2).setCellValue(e.getAmount().doubleValue());
            row.createCell(3).setCellValue(e.getDescription());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }

    private Map<Integer, String> getCategoryNames() {
        return categoryRepository.findAll().stream()
                .collect(Collectors.toMap(
                        category -> category.getId().intValue(),
                        Category::getName
                ));
    }

    private String getCategoryName(Map<Integer, String> categoryNames, int categoryId) {
        return categoryNames.getOrDefault(categoryId, "Category #" + categoryId);
    }

    private String toCsvRow(String... values) {
        return java.util.Arrays.stream(values)
                .map(this::escapeCsv)
                .collect(Collectors.joining(","));
    }

    private String escapeCsv(String value) {
        String safeValue = value == null ? "" : value;
        if (safeValue.contains(",") || safeValue.contains("\"") || safeValue.contains("\n") || safeValue.contains("\r")) {
            return "\"" + safeValue.replace("\"", "\"\"") + "\"";
        }
        return safeValue;
    }

    @GetMapping("/transactions-overview")
    public List<TransactionOverviewResponse> getTransactionsOverview(Authentication authentication) {
        Map<Integer, String> categoryNames = getCategoryNames();

        List<TransactionOverviewResponse> incomeTransactions = incomes
                .fetchAllIncomesByUser(authentication.getName())
                .stream()
                .map(income -> mapIncomeOverview(income, categoryNames))
                .toList();

        List<TransactionOverviewResponse> expenseTransactions = expenses
                .fetchAllExpensesByUser(authentication.getName())
                .stream()
                .map(expense -> mapExpenseOverview(expense, categoryNames))
                .toList();

        List<TransactionOverviewResponse> combined = new ArrayList<>();
        combined.addAll(incomeTransactions);
        combined.addAll(expenseTransactions);
        combined.sort((left, right) -> right.date().compareTo(left.date()));
        return combined;
    }

    private TransactionOverviewResponse mapIncomeOverview(Income income, Map<Integer, String> categoryNames) {
        return new TransactionOverviewResponse(
                "income-" + income.getId(),
                "INCOME",
                income.getDate(),
                income.getDescription(),
                getCategoryName(categoryNames, income.getCategory()),
                income.getAmount()
        );
    }

    private TransactionOverviewResponse mapExpenseOverview(Expense expense, Map<Integer, String> categoryNames) {
        return new TransactionOverviewResponse(
                "expense-" + expense.getId(),
                "EXPENSE",
                expense.getDate(),
                expense.getDescription(),
                getCategoryName(categoryNames, expense.getCategory()),
                expense.getAmount()
        );
    }
}


