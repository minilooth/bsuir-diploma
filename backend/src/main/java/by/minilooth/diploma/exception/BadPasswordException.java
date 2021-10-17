package by.minilooth.diploma.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BadPasswordException extends Exception {

    public BadPasswordException(String message) {
        super(message);
    }

}
