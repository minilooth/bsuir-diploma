package by.minilooth.diploma.exception.deals;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class DealNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти сделку";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public DealNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public DealNotFoundException(String message) {
        super(message);
    }

    public DealNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
