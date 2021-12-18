package by.minilooth.diploma.dto.cart.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.cart.CartDto;
import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.cart.CartItem;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.nbrb.service.NbRbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CartMapper extends AbstractMapper<Cart, CartDto> {

    @Autowired private CartItemMapper cartItemMapper;
    @Autowired private NbRbService nbRbService;

    public CartMapper() {
        super(Cart.class, CartDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Cart.class, CartDto.class)
                .addMappings(m -> {
                    m.skip(CartDto::setItems);
                    m.skip(CartDto::setTotalQuantity);
                }).setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(Cart source, CartDto destination) {
        Set<CartItem> items = source.getItems();
        Set<CartItem> sorted = items.stream().sorted(Comparator.comparing(i -> i.getSparePart().getName()))
                .collect(Collectors.toCollection(LinkedHashSet::new));
        Long quantity = items.stream().map(CartItem::getQuantity).mapToLong(Long::longValue).sum();
        Float cost = (float)items.stream().map(i -> i.getQuantity() * i.getSparePart().getRetailPrice())
                .mapToDouble(Float::doubleValue).sum();

        destination.setItems(cartItemMapper.toDto(sorted));
        destination.setTotalQuantity(quantity);
        destination.setTotalCost(cost);
        destination.setTotalCostUsd(nbRbService.convertToUSD(cost));
        destination.setTotalCostEur(nbRbService.convertToEUR(cost));
    }
}
