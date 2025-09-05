package com.example.ecommercefrontend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .httpBasic(httpBasic -> httpBasic.disable())
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/js/**", "/css/**", "/jobs", "/apply","/post-job","/applicants","/job_detail").permitAll() // /apply ကို ထည့်သွင်းပေးရန်
                .anyRequest().authenticated()
            );
        return http.build();
    }
}

