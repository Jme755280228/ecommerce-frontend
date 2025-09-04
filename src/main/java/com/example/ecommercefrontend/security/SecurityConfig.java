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
            .csrf(csrf -> csrf.disable()) // CSRF ကို ပိတ်ထားခြင်း
            .httpBasic(httpBasic -> httpBasic.disable()) // HTTP Basic Authentication ကို ပိတ်ထားခြင်း
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/js/**", "/css/**", "/jobs").permitAll() // အများသုံး URL တွေကို ဝင်ခွင့်ပြု
                .anyRequest().authenticated() // ကျန်တဲ့ request တွေ အားလုံးကို authentication လိုအပ်စေခြင်း
            );
        return http.build();
    }
}

