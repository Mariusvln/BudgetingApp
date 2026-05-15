package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({
            "/",
            "/signin",
            "/signup",
            "/main",
            "/dashboard",
            "/analytics",
            "/incomes",
            "/expenses",
            "/admin",
            "/profile",
            "/budgeting",
            "/logout"
    })
    public String forwardReactRoutes() {
        return "forward:/index.html";
    }
}
