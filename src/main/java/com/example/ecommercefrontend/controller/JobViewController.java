package com.example.ecommercefrontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
public class JobViewController {

    @GetMapping("/jobs")
    public String showJobsPage() {
        return "jobs";
    }

    @GetMapping("/apply")
    public String showApplyPage() {
        return "apply";
    }

    @GetMapping("/post-job")
    public String showPostJobPage() {
        return "post_job";
    }

    @GetMapping("/applicants")
    public String showApplicantsPage() {
        return "applicants";
    }

    @GetMapping("/job-detail")
    public String showJobDetailsPage(@RequestParam Long id, Model model) {
        model.addAttribute("jobId", id);
        return "job_detail";
    }
}

