package by.minilooth.diploma.dto.cart.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.cart.CartItemKeyDto;
import by.minilooth.diploma.models.bean.keys.CartItemKey;
import org.springframework.stereotype.Component;

@Component
public class CartItemKeyMapper extends AbstractMapper<CartItemKey, CartItemKeyDto> {

    public CartItemKeyMapper() {
        super(CartItemKey.class, CartItemKeyDto.class);
    }

}
