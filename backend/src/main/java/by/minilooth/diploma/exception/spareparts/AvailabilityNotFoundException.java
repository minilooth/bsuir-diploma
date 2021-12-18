package by.minilooth.diploma.exception.spareparts;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class AvailabilityNotFoundException extends Exception {

    public AvailabilityNotFoundException(Long sparePartId, Long storeId) {
        super(String.format("Не удалось найти наличие запчасти с ID %d в магазине/складе с ID %d", sparePartId, storeId));
    }

}
