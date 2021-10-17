package by.minilooth.diploma.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ActionIsImpossibleException extends Exception {

    public ActionIsImpossibleException(String message) {
        super(message);
    }

}
