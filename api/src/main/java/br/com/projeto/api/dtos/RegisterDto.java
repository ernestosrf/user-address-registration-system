package br.com.projeto.api.dtos;
import jakarta.validation.constraints.NotNull;

public record RegisterDto(@NotNull String username, @NotNull String password) {
    
}
