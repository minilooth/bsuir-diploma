package by.minilooth.diploma.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthEntryPointJwt.class);
    
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        LOGGER.error("Unauthorized error: {}", authException.getMessage());

        if (authException instanceof BadCredentialsException) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Bad credentials");
        }
        else if (authException instanceof LockedException) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Account is banned");
        }
        else if (authException instanceof InsufficientAuthenticationException) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: You are not authorized or session expired, pleas log in");
        }
        else {
            LOGGER.info(authException.getClass().getName());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: " + authException.getLocalizedMessage());
        }
    } 
}
