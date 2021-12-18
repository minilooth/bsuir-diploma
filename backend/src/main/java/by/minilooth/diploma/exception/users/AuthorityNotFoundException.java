package by.minilooth.diploma.exception.users;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class AuthorityNotFoundException extends Exception {

    public AuthorityNotFoundException(String key) {
        super(String.format("Не удалось найти привилегию с ключем: %s", key));
    }

}
