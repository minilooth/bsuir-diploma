package by.minilooth.diploma.exception.stores;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class StoreNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти склад/магазин";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public StoreNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public StoreNotFoundException(String message) {
        super(message);
    }

    public StoreNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
