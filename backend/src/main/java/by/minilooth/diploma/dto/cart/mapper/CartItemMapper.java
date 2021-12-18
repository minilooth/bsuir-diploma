package by.minilooth.diploma.dto.cart.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.cart.CartItemDto;
import by.minilooth.diploma.dto.spareparts.mapper.SparePartMapper;
import by.minilooth.diploma.dto.stores.mapper.StoreMapper;
import by.minilooth.diploma.models.bean.cart.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class CartItemMapper extends AbstractMapper<CartItem, CartItemDto> {

    @Autowired private CartItemKeyMapper cartItemKeyMapper;
    @Autowired private SparePartMapper sparePartMapper;
    @Autowired private StoreMapper storeMapper;

    public CartItemMapper() {
        super(CartItem.class, CartItemDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(CartItem.class, CartItemDto.class)
                .addMappings(m -> {
                    m.skip(CartItemDto::setId);
                    m.skip(CartItemDto::setSparePart);
                    m.skip(CartItemDto::setStore);
                }).setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(CartItem source, CartItemDto destination) {
        destination.setId(cartItemKeyMapper.toDto(source.getId()));
        destination.setSparePart(sparePartMapper.toDto(source.getSparePart()));
        destination.setStore(storeMapper.toDto(source.getStore()));
    }
}
