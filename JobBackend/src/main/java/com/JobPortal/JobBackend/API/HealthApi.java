package com.JobPortal.JobBackend.API;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthApi {

    @GetMapping("/")
    public String welcome() {
        return "✅ Job Portal Backend is running!";
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
