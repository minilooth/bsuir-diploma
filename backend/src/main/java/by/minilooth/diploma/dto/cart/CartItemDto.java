package by.minilooth.diploma.dto.cart;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.dto.spareparts.SparePartDto;
import by.minilooth.diploma.dto.stores.StoreDto;
import lombok.Data;

@Data
public class CartItemDto implements BaseDto {

    private CartItemKeyDto id;
    private SparePartDto sparePart;
    private StoreDto store;
    private Long quantity;

}
