package by.minilooth.diploma.exception.handler;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.util.*;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        String message = Objects.requireNonNull(ex.getBindingResult().getFieldError()).getDefaultMessage();
        ErrorResponse response = buildErrorResponse(message, status, request);
        return ResponseEntity.status(status).headers(headers).body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex,
                                                            HttpHeaders headers, HttpStatus status, WebRequest request) {
        String message = List.copyOf(ex.getConstraintViolations()).get(0).getMessage();
        ErrorResponse response = buildErrorResponse(message, status, request);
        return ResponseEntity.status(status).headers(headers).body(response);
    }

    private ErrorResponse buildErrorResponse(String message, HttpStatus status, WebRequest request) {
        NativeWebRequest nativeWebRequest = (NativeWebRequest)request;

        Integer statusCode = status.value();
        String error = status.getReasonPhrase();
        String path = Objects.requireNonNull(nativeWebRequest.getNativeRequest(HttpServletRequest.class)).getServletPath();

        return ErrorResponse.builder()
                .error(error)
                .message(message)
                .path(path)
                .status(statusCode)
                .build();
    }

}
