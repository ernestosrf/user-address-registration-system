package br.com.projeto.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import br.com.projeto.api.repository.Repo;
import br.com.projeto.api.security.JwtIssuer;
import br.com.projeto.api.services.AuthorizationService;
import jakarta.validation.Valid;
import br.com.projeto.api.dtos.AuthenticationDto;
import br.com.projeto.api.dtos.RegisterDto;
// models
import br.com.projeto.api.models.User;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    AuthorizationService authorizationService;

    @Autowired
    private Repo action;

    private final JwtIssuer jwtIssuer;

    @GetMapping("/")
    public String test() {
        return "Hello World!";
    }
    
    // @PostMapping("/register")
    // public User register(@RequestBody User user) {
    //     return action.save(user);
    // }

    // @PostMapping("/auth/login")
    // public User login(@RequestBody @Validated User user) {
    //     var userFound = action.findByUsername(user.getUsername());
    //     var token = jwtIssuer.issueToken(userFound.getId(), userFound.getUsername());
    //     userFound.setAcessToken(token);
    //     return action.save(userFound);
    // }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDto authenticationDto) {
        return authorizationService.login(authenticationDto);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody RegisterDto registerDto) {
        return authorizationService.register(registerDto);
    }


}
 