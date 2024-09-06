package br.com.projeto.api.security;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import br.com.projeto.api.models.User;

@Component
public class JwtIssuer {

    @Value("${jwt.secret")
    private String secret;

    public String issueToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
            .withIssuer("auth")
            .withSubject(user.getUsername())
            .withExpiresAt(Instant.now().plus(Duration.of(1, ChronoUnit.DAYS)))
            .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error issuing token: " + e.getMessage(), e);
        }
    }   

    public ResponseEntity<String> validateToken(String token) {
        try {
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(secret))
                .withIssuer("auth")
                .build()
                .verify(token);
            return ResponseEntity.ok(decodedJWT.getSubject());
        } catch (JWTVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
    }

    private Instant getExpirationDate() {
        return Instant.now().plus(Duration.of(1, ChronoUnit.DAYS));
    }
}
