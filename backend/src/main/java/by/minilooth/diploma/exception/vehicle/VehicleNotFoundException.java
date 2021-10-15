package by.minilooth.diploma.exception.vehicle;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class VehicleNotFoundException extends Exception {

    private final static String DEFAULT_MESSAGE = "Не удалось найти адрес";
    private final static String DEFAULT_FORMAT =  DEFAULT_MESSAGE + " c id=%d";

    public VehicleNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public VehicleNotFoundException(String message) {
        super(message);
    }

    public VehicleNotFoundException(Long id) {
        super(String.format(DEFAULT_FORMAT, id));
    }

}
