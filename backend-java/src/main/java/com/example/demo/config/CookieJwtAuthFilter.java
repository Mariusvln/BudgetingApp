package com.example.demo.config;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CookieJwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("access_token".equals(c.getName())) {
                    req = new JwtWrapper(req, c.getValue());
                }
            }
        }
        chain.doFilter(req, res);
    }

    static class JwtWrapper extends HttpServletRequestWrapper {
        private final String token;

        JwtWrapper(HttpServletRequest r, String t) {
            super(r);
            this.token = t;
        }

        @Override
        public String getHeader(String name) {
            if ("Authorization".equalsIgnoreCase(name)) return "Bearer " + token;
            return super.getHeader(name);
        }
    }
}
