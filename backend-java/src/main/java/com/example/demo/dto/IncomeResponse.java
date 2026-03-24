package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;

import java.math.BigDecimal;
import java.time.LocalDate;

public class IncomeResponse {


    public Long id;

    public String description;

    public BigDecimal amount;

    public LocalDate date;

    //    @ManyToOne
//    @JoinColumn(name = "category_id")
//    private Category category;
    public int category;

    public PROCESS_TYPE processType;

    // private userid userid; ADD THIS

    // Constructors
    public IncomeResponse() {}

    public IncomeResponse(String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.processType = processType;
    }

//    public IncomeReponse mapToDTO(Income income) {
//        return new IncomeReponse(income.getDescription(), income.getAmount(), income.getDate(), income.getCategory(), income.getProcessType());
//    }
//
//    public List<IncomeReponse> mapUsersToDTOs(List<Income> incomes) {
//        return incomes.stream()
//                .map(this::mapToDTO)
//                .collect(Collectors.toList());
//    }
}
