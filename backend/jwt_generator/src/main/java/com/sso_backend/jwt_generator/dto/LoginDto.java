package com.sso_backend.jwt_generator.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    private String email;
    private String password;
}