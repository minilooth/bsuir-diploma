package by.minilooth.diploma.exception.vehicle;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class GenerationNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти поколение";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public GenerationNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public GenerationNotFoundException(String message) {
        super(message);
    }

    public GenerationNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
