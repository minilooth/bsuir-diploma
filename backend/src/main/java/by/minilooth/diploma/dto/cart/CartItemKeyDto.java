package by.minilooth.diploma.dto.cart;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class CartItemKeyDto implements BaseDto {

    private Long cartId;
    private Long sparePartId;

}
