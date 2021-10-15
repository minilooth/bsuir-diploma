package by.minilooth.diploma.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccessDeniedHandlerImpl.class);

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, 
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        LOGGER.error("Access denied: " + accessDeniedException.getMessage());
        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Ошибка: " + accessDeniedException.getLocalizedMessage());
    }
    
}
