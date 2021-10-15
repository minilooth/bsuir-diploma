package by.minilooth.diploma.exception.spareparts;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class SparePartNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти запчасть";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public SparePartNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public SparePartNotFoundException(String message) {
        super(message);
    }

    public SparePartNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
