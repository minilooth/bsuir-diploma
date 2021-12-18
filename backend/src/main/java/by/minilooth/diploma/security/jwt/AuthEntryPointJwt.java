package by.minilooth.diploma.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.*;
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
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка: Неверное имя пользователя или пароль");
        }
        else if (authException instanceof LockedException) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка: Аккаунт заблокирован");
        }
        else if (authException instanceof InsufficientAuthenticationException) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка: Вы не авторизованы или сессия истекла, пожалуйста перезайдите в аккаунт");
        }
        else if (authException instanceof DisabledException) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка: Администратор еще не подтвердил вашу регистрацию");
        }
        else if (authException instanceof AccountExpiredException) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка: E-mail не подтвержден");
        }
        else {
            LOGGER.info(authException.getClass().getName());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка: " + authException.getLocalizedMessage());
        }
    } 
}
