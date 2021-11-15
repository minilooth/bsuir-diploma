package by.minilooth.diploma.exception.spareparts;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class SparePartAlreadyExistsException extends Exception {

    private final static String DEFAULT_FORMAT = "Запчасть с артикулом %s";

    public SparePartAlreadyExistsException(String article) {
        super(String.format(DEFAULT_FORMAT, article));
    }

}
