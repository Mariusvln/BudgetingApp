package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Income;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/incomes/")
@RequiredArgsConstructor
@Valid
public class IncomeController {

    private final IncomeService incomes;

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
    public RegisterResponse deleteIncome(@Valid @RequestParam Long expenseId) {
        incomes.deleteIncome(expenseId);
        return new RegisterResponse("OK");
    }

    public IncomeResponse mapToDTO(Income income) {
        return new IncomeResponse(income.getUser().getId(), income.getDescription(), income.getAmount(), income.getDate(), income.getCategory(), income.getProcessType());
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
            HttpServletResponse response
    ) throws IOException {

        List<Income> incomesList = incomes.showAllIncomes();

        if (type.equalsIgnoreCase("excel")) {
            exportExcel(incomesList, response);
        } else {
            exportCSV(incomesList, response);
        }
    }

    private void exportCSV(List<Income> incomesList, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=incomes.csv");

        PrintWriter writer = response.getWriter();
        writer.println("Date,Category,Amount,Description");

        for (Income i : incomesList) {
            writer.println(
                    i.getDate() + "," +
                            i.getCategory() + "," +
                            i.getAmount() + "," +
                            i.getDescription()
            );
        }

        writer.flush();
    }

    private void exportExcel(List<Income> incomesList, HttpServletResponse response) throws IOException {

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
            row.createCell(1).setCellValue(i.getCategory());
            row.createCell(2).setCellValue(i.getAmount().doubleValue());
            row.createCell(3).setCellValue(i.getDescription());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }

}


