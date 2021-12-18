package by.minilooth.diploma.exception.cart;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class CartItemNotFoundException extends Exception {

    public CartItemNotFoundException(Long sparePartId) {
        super(String.format("Не удалось найти позицию в корзине с товаром с ID %d", sparePartId));
    }

}
