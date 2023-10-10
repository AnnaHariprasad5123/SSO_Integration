package com.sso_backend.jwt_generator.service;

import java.util.Map;

import com.sso_backend.jwt_generator.dto.UserDto;

public interface JwtGenerator {
    Map<String, String> generateToken(UserDto userDto);
}
