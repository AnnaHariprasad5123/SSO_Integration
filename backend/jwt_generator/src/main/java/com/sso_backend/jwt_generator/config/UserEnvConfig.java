package com.sso_backend.jwt_generator.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:.env")
public class UserEnvConfig {

}