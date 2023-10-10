package com.sso_backend.jwt_generator.service;

import com.sso_backend.jwt_generator.dto.LoginDto;
import com.sso_backend.jwt_generator.dto.UserDto;


public interface UserService {
    UserDto saveUser(UserDto userDto);

    UserDto getUserByID(Long userId);

    UserDto getUser(LoginDto loginDto);

    boolean validateToken(String token);
}
