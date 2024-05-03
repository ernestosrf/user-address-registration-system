package br.com.projeto.api.services;

import java.sql.Date;

import org.apache.catalina.connector.Response;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.projeto.api.dtos.AuthenticationDto;
import br.com.projeto.api.dtos.RegisterDto;
import br.com.projeto.api.models.User;
import br.com.projeto.api.repository.UserRepository;
import br.com.projeto.api.security.JwtIssuer;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@Service
public class AuthorizationService implements UserDetailsService{

    @Autowired
    private ApplicationContext context;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtIssuer tokenService;

    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDto data){
        try {
            authenticationManager = context.getBean(AuthenticationManager.class);
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.issueToken((User) auth.getPrincipal());
            System.out.println(token);
            return ResponseEntity.ok(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(Response.SC_UNAUTHORIZED).body("Unexistent user or wrong password");
        }

    }

    public ResponseEntity<Object> register(@RequestBody RegisterDto registerDto){
        if (this.userRepository.findByUsername(registerDto.username()) != null){
            return ResponseEntity.status(Response.SC_CONFLICT).body("User already exists");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.password());
        User newUser = new User(registerDto.username(), encryptedPassword);
        // newUser.setCreatedAt(new Date(System.currentTimeMillis()));
        this.userRepository.save(newUser);
        return ResponseEntity.ok(newUser);        
    }

    public String logout(HttpServletRequest request, HttpServletResponse response){
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "Logout successful";
    }

    
}
