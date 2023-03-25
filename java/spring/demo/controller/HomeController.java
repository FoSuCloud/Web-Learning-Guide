package com.example.springdemo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequiredArgsConstructor
public class HomeController {
    @PostMapping("/")
    public String index() {
        return "index";
    }
    @GetMapping("/get")
    public String getHome() {
        return "getHome";
    }
}
