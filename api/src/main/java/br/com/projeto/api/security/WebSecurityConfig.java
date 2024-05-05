package br.com.projeto.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    @Autowired
    SecurityFilter securityFilter;


    @Bean
    public SecurityFilterChain applicationSecurity(HttpSecurity http) throws Exception {
        http.addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);

        http
            .cors(cors -> cors
                .configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.applyPermitDefaultValues();
                    config.addAllowedMethod("PUT");
                    config.addAllowedMethod("DELETE");
                    config.addAllowedOrigin("http://localhost:4200");
                    return config;
                }))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .formLogin(formLogin -> formLogin.disable())
            .securityMatcher("/**")
            .authorizeHttpRequests(registry -> registry
                .requestMatchers("/").permitAll()
                .requestMatchers("/auth/register").permitAll()
                .requestMatchers("/auth/login").permitAll()
                .anyRequest().authenticated()
            );  

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenthicationConfiguration) throws Exception{
        return authenthicationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
