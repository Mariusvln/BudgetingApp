package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Category;
import com.example.demo.entity.Income;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/api/app/incomes/")
@RequiredArgsConstructor
@Valid
public class IncomeController {

    private final IncomeService incomes;
    private final CategoryRepository categoryRepository;

    @PostMapping("/")
    public RegisterResponse addIncome(@Valid @RequestBody IncomeRequest income, Authentication authentication) {
        incomes.addIncome(authentication.getName(), income);
        return new RegisterResponse("OK");
    }

    @PutMapping("/")
    public RegisterResponse updateIncome(@Valid @RequestBody Income updated, Authentication authentication) {
        incomes.updateIncome(authentication.getName(), updated);
        return new RegisterResponse("OK");
    }

    @DeleteMapping ("/")
    public RegisterResponse deleteIncome(@Valid @RequestParam Long incomeId, Authentication authentication) {
        incomes.deleteIncome(authentication.getName(), incomeId);
        return new RegisterResponse("OK");
    }

    public IncomeResponse mapToDTO(Income income) {
        return new IncomeResponse(income.getUser().getId(), income.getId(), income.getDescription(), income.getAmount(), income.getDate(), income.getCategory(), income.getProcessType());
    }

    public List<IncomeResponse> mapUsersToDTOs(List<Income> incomes) {
        return incomes.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/showAllIncomes")
    public List<IncomeResponse> showAllIncomes() {
        List<Income> resultIncomes = incomes.showAllIncomes();

        return mapUsersToDTOs(resultIncomes);
    }


    @GetMapping("/allFromDateStartToDateFinish")
    public List<Income> fetchIncomesFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd) {
        List<Income> total = incomes.fetchAllGivenIncomesFromDateStartToDateEnd(dateStart, dateEnd);

        return total;
    }

    @GetMapping("/")
    public List<IncomeResponse> fetchAllIncomesByUser(Authentication authentication) {
        List<Income> resultIncomes = incomes.fetchAllIncomesByUser(authentication.getName());

        return mapUsersToDTOs(resultIncomes);
    }

    @GetMapping("/fromDateStartToDateFinish")
    public List<Income> fetchIncomesByUserFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd, Authentication authentication) {
            List<Income> incomesList = incomes.fetchIncomesByUserFromDateStartToDateEnd(authentication.getName(), dateStart, dateEnd);

        return incomesList;
    }

    @GetMapping("/exportIncomes")
    public void exportIncomes(
            @RequestParam(defaultValue = "csv") String type,
            Authentication authentication,
            HttpServletResponse response
    ) throws IOException {

        List<Income> incomesList = incomes.fetchAllIncomesByUser(authentication.getName());
        Map<Integer, String> categoryNames = getCategoryNames();

        if (type.equalsIgnoreCase("excel")) {
            exportExcel(incomesList, categoryNames, response);
        } else {
            exportCSV(incomesList, categoryNames, response);
        }
    }

    private void exportCSV(List<Income> incomesList, Map<Integer, String> categoryNames, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=incomes.csv");

        PrintWriter writer = response.getWriter();
        writer.println("Date,Category,Amount,Description");

        for (Income i : incomesList) {
            writer.println(
                    i.getDate() + "," +
                            getCategoryName(categoryNames, i.getCategory()) + "," +
                            i.getAmount() + "," +
                            i.getDescription()
            );
        }

        writer.flush();
    }

    private void exportExcel(List<Income> incomesList, Map<Integer, String> categoryNames, HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Incomes");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Date");
        header.createCell(1).setCellValue("Category");
        header.createCell(2).setCellValue("Amount");
        header.createCell(3).setCellValue("Description");

        int rowNum = 1;
        for (Income i : incomesList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(i.getDate().toString());
            row.createCell(1).setCellValue(getCategoryName(categoryNames, i.getCategory()));
            row.createCell(2).setCellValue(i.getAmount().doubleValue());
            row.createCell(3).setCellValue(i.getDescription());
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

}


