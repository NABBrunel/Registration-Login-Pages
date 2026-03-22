package com.example.demo.Security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

public class JWTAuthenticationFilter extends GenericFilterBean {
@Override
public void doFilter(ServletRequest request,
                     ServletResponse response,
                     FilterChain filterChain)
        throws IOException, ServletException {

    HttpServletRequest httpRequest = (HttpServletRequest) request;
    if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
        filterChain.doFilter(request, response);
        return;
    }

    Authentication authentication = JWTService.getAuthentication(httpRequest);
    if (authentication != null) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    filterChain.doFilter(request, response);
		}
	}
