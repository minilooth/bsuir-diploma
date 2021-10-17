package by.minilooth.diploma.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class PasswordsAreDifferentException extends Exception {

    public PasswordsAreDifferentException(String message) {
        super(message);
    }

}
