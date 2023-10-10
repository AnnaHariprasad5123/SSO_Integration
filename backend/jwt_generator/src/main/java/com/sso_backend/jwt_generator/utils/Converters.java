package com.sso_backend.jwt_generator.utils;

import com.sso_backend.jwt_generator.dto.UserDto;
import com.sso_backend.jwt_generator.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Converters {

    private ModelMapper modelMapper;

    @Autowired
    public Converters(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public UserDto entityToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public User dtoToEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }
}
