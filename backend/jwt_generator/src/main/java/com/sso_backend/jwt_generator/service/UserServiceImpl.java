package com.sso_backend.jwt_generator.service;

import com.sso_backend.jwt_generator.dto.LoginDto;
import com.sso_backend.jwt_generator.dto.UserDto;
import com.sso_backend.jwt_generator.entity.User;
import com.sso_backend.jwt_generator.exception.UserNotFoundException;
import com.sso_backend.jwt_generator.repository.UserRepository;
import com.sso_backend.jwt_generator.utils.Converters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.sso_backend.jwt_generator.utils.Constants.*;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private Converters converters;
    private JwtGeneratorImpl jwtGenerator;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, Converters converters, JwtGeneratorImpl jwtGenerator, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.converters = converters;
        this.jwtGenerator = jwtGenerator;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public UserDto saveUser(UserDto userDto) {
        Optional<User> userEmail = userRepository.findByEmail(userDto.getEmail());
        if (userEmail.isPresent())
            throw new IllegalArgumentException("User already exists !");
        else {
            User newUser = new User();
            newUser.setEmail(userDto.getEmail());
            newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
            return converters.entityToDto(userRepository.save(newUser));
        }
    }

    @Override
    public UserDto getUser(LoginDto loginDto) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword()))
                    return this.converters.entityToDto(user);

                throw new UserNotFoundException(INVALID_PASSWORD);
            }
            throw new UserNotFoundException(USER_NOT_FOUND);

        } catch (Exception e) {
            throw new UserNotFoundException(USER_NOT_FOUND + e.getMessage());
        }
    }

    @Override
    public UserDto getUserByID(Long userId) {
        User existUser = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with " + userId + ID_NOT_FOUND));
        return converters.entityToDto(existUser);
    }

    @Override
    public boolean validateToken(String token) {
        return jwtGenerator.validateToken(token);
    }
}
