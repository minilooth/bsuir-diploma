package by.minilooth.diploma.exception.spareparts;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ManufacturerNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти производителя";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public ManufacturerNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public ManufacturerNotFoundException(String message) {
        super(message);
    }

    public ManufacturerNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
