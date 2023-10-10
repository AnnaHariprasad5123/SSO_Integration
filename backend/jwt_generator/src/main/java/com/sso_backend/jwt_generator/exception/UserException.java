package com.sso_backend.jwt_generator.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class UserException {

    private String message;

    private HttpStatus httpStatus;
}