package by.minilooth.diploma.exception.categories;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class GroupNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти подкатегорию";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public GroupNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public GroupNotFoundException(String message) {
        super(message);
    }

    public GroupNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
