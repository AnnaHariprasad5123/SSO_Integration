package com.sso_backend.jwt_generator.controller;

import com.sso_backend.jwt_generator.dto.UserDto;
import com.sso_backend.jwt_generator.service.JwtGenerator;
import com.sso_backend.jwt_generator.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.sso_backend.jwt_generator.utils.Constants.USER_BASE_URL;

@RestController
@RequestMapping(USER_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserService userService;

    private JwtGenerator jwtGenerator;

    @Autowired
    public UserController(UserService userService, JwtGenerator jwtGenerator) {
        this.userService = userService;
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping("/{id}")
    public UserDto fetchUserById(@PathVariable Long id) {
        return userService.getUserByID(id);
    }
}
