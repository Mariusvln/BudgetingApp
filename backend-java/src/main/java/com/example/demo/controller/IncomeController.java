package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Income;
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
public class IncomeController {

    private final IncomeService incomes;

    @PostMapping("/addIncome")
    public RegisterResponse addIncome(@RequestBody Income income) {
        incomes.addIncome(income);
        return new RegisterResponse("OK");
    }

    @PutMapping("/updateIncome")
    public RegisterResponse updateIncome(@RequestBody Income updated) {
        incomes.updateIncome(updated);
        return new RegisterResponse("OK");
    }

    @DeleteMapping ("/deleteIncome")
    public RegisterResponse deleteIncome(@RequestParam Long expenseId) {
        incomes.deleteIncome(expenseId);
        return new RegisterResponse("OK");
    }

    public IncomeResponse mapToDTO(Income income) {
        return new IncomeResponse(income.getDescription(), income.getAmount(), income.getDate(), income.getCategory(), income.getProcessType());
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

    @GetMapping("/fetchIncomes")
    public RegisterResponse calculateIncomes() {
        BigDecimal total = incomes.fetchAllGivenIncomes();


        return new RegisterResponse(total.toString());
    }

    @GetMapping("/fetchIncomesFromDateStartToDateFinish")
    public List<Income> calculateIncomesFromDateStartToDateFinish(@RequestParam LocalDate dateStart, @RequestParam LocalDate dateEnd) {
        List<Income> total = incomes.fetchAllGivenIncomesFromDateStartToDateEnd(dateStart, dateEnd);

        return total;
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


