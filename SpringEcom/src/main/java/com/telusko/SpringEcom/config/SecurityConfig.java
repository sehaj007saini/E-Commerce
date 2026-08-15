package com.telusko.SpringEcom.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults()) // Use standard Spring CORS configuration
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/coupons/**").permitAll()
                .requestMatchers("/api/chat").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products", "/api/product/**", "/api/products/search", "/api/products/*/reviews").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/products/*/reviews").permitAll()
                .requestMatchers("/api/orders/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/product").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/product/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/product/**").hasRole("ADMIN")
                .anyRequest().permitAll()
            )
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.builder()
            .username("admin")
            .password("{noop}admin") // {noop} means no password encoding
            .roles("ADMIN")
            .build();

        return new InMemoryUserDetailsManager(admin);
    }
}
