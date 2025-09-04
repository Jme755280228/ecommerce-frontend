package com.example.ecommercefrontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JobViewController {

    @GetMapping("/jobs")
    public String showJobsPage() {
        return "jobs"; // Renders jobs.html
    }
}

