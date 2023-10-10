package com.sso_backend.jwt_generator.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HandleExceptions {

    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(UserNotFoundException userNotFoundException) {
        UserException bookException = new UserException(userNotFoundException.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(bookException, HttpStatus.NOT_FOUND);
    }
}