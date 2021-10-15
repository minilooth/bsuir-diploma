package by.minilooth.diploma.exception.vehicle;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ModelNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти модель";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public ModelNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public ModelNotFoundException(String message) {
        super(message);
    }

    public ModelNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
