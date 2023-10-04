package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }

    @GetMapping("/{id}")
    public BasicUserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

}
