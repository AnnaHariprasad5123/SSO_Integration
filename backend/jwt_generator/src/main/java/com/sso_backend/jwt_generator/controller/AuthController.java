package com.sso_backend.jwt_generator.controller;

import com.sso_backend.jwt_generator.dto.LoginDto;
import com.sso_backend.jwt_generator.dto.UserDto;
import com.sso_backend.jwt_generator.dto.UserResponseDto;
import com.sso_backend.jwt_generator.exception.UserNotFoundException;
import com.sso_backend.jwt_generator.service.JwtGenerator;
import com.sso_backend.jwt_generator.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.sso_backend.jwt_generator.utils.Constants.AUTH_BASE_URL;

@RestController
@RequestMapping(AUTH_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private UserService userService;
    private JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(UserService userService, JwtGenerator jwtGenerator) {
        this.userService = userService;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        try {
            UserDto createdUser = userService.saveUser(userDto);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody LoginDto loginDto) {
        try {
            UserDto userDto = userService.getUser(loginDto);
            Map<String, String> token = jwtGenerator.generateToken(userDto);
            UserResponseDto responseDto = new UserResponseDto();
            responseDto.setUser(userDto);
            responseDto.setToken(token);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
        boolean isValid = userService.validateToken(token);
        if (isValid) {
            return new ResponseEntity<>("valid request", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid request", HttpStatus.NOT_FOUND);
        }
    }

}
