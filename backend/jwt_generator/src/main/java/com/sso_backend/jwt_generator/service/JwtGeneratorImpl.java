package com.sso_backend.jwt_generator.service;

import com.sso_backend.jwt_generator.dto.UserDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class JwtGeneratorImpl implements JwtGenerator {


    @Value("${jwt.secret}")
    public String secret;

    @Value("${app.jwtToken.message}")
    public String message;

    @Override
    public Map<String, String> generateToken(UserDto userDto) {

        String jwtToken = "";
        jwtToken = Jwts.builder().
                setSubject(userDto.getEmail()).
                setIssuedAt(new Date()).
                signWith(SignatureAlgorithm.HS256, getSignKey()).
                compact();
        Map<String, String> jwtTokenGen = new HashMap<>();
        jwtTokenGen.put("token", jwtToken);
        jwtTokenGen.put("message", message);

        return jwtTokenGen;
    }

    public Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(final String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSignKey())
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}

