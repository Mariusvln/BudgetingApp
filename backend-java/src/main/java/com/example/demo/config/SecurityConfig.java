    package com.example.demo.config;

    import com.example.demo.service.JwtService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.config.Customizer;
    import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.oauth2.jwt.JwtDecoder;
    import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
    import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
    import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

    @EnableMethodSecurity
    @Configuration
    @RequiredArgsConstructor
    public class SecurityConfig {

        private final CookieJwtAuthFilter cookieFilter;
        private final JwtService jwtService;


        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .cors(Customizer.withDefaults())
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers("/api/app/**").permitAll()
                            .requestMatchers("/api/users/**").permitAll()
                            .requestMatchers("/api/categories/**").permitAll()
                            .requestMatchers("/api/activity/**").permitAll()
                            .anyRequest().authenticated()
                    )
                    .addFilterBefore(cookieFilter, UsernamePasswordAuthenticationFilter.class)
                    .oauth2ResourceServer(oauth -> oauth
                            .jwt(jwt -> jwt.decoder(jwtDecoder())
                                    .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                    );

            return http.build();
        }

        @Bean
        public JwtDecoder jwtDecoder() {
            return NimbusJwtDecoder.withSecretKey(jwtService.getHmacSecretKey()).build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public JwtAuthenticationConverter jwtAuthenticationConverter() {
            JwtGrantedAuthoritiesConverter authoritiesConverter =
                    new JwtGrantedAuthoritiesConverter();

            authoritiesConverter.setAuthorityPrefix("");
            authoritiesConverter.setAuthoritiesClaimName("role");

            JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
            converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);
            return converter;
        }


    }

