package by.minilooth.diploma.exception.spareparts;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ModificationNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти модификацию";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public ModificationNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public ModificationNotFoundException(String message) {
        super(message);
    }

    public ModificationNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
