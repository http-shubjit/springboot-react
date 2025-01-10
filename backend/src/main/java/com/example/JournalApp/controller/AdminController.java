package com.example.JournalApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.JournalApp.cache.AppCache;
import com.example.JournalApp.entity.User;
import com.example.JournalApp.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/admin")
@Tag(name = "Admin Api",description = "Get")
public class AdminController {

    @Autowired
    private UserService userService;
    @Autowired
    private AppCache appCache;

    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
        List<User> all = userService.getAllUsers();
        if (all != null && !all.isEmpty()) {
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("clear-app-cache")
    public void clearAppCache() {
        appCache.init();
    }
}


