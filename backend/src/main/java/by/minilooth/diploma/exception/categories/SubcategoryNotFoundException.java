package by.minilooth.diploma.exception.categories;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class SubcategoryNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти подкатегорию";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public SubcategoryNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public SubcategoryNotFoundException(String message) {
        super(message);
    }

    public SubcategoryNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
