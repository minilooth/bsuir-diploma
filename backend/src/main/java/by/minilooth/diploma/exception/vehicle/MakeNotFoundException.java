package by.minilooth.diploma.exception.vehicle;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class MakeNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти марку";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public MakeNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public MakeNotFoundException(String message) {
        super(message);
    }

    public MakeNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
