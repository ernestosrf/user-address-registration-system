package br.com.projeto.api.security;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import br.com.projeto.api.models.User;

@Component
public class JwtIssuer {

    public String issueToken(User user) {
        return JWT.create()
            .withIssuer("auth")
            .withSubject(user.getId())
            .withExpiresAt(Instant.now().plus(Duration.of(1, ChronoUnit.DAYS)))
            .withClaim("u", user.getUsername())
            .sign(Algorithm.HMAC256("secret"));
    }   

    public String validateToken(String token) {
        return JWT.require(Algorithm.HMAC256("secret"))
            .withIssuer("auth")
            .build()
            .verify(token)
            .getSubject();
    }

    private Instant getExpirationDate() {
        return Instant.now().plus(Duration.of(1, ChronoUnit.DAYS));
    }
}
