package com.sso_backend.jwt_generator.dto;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private UserDto user;
    private Map<String, String> token;
}
