package com.example.demo.dto;

import com.example.demo.entity.PROCESS_TYPE;

import java.math.BigDecimal;
import java.time.LocalDate;

public record IncomeResponse (String description, BigDecimal amount, LocalDate date, int category, PROCESS_TYPE processType){}
