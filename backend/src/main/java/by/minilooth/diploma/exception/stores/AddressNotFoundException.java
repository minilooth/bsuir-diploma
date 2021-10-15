package by.minilooth.diploma.exception.stores;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class AddressNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти адрес";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public AddressNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public AddressNotFoundException(String message) {
        super(message);
    }

    public AddressNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
