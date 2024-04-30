package br.com.projeto.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// models
import br.com.projeto.api.models.User;
import br.com.projeto.api.repository.Repo;

@RestController
public class Controller {

    @Autowired
    private Repo action;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return action.save(user);
    }

    @GetMapping("/")
    public String test() {
        return "Hello World!";
    }
    
}
