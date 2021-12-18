package by.minilooth.diploma.dto.cart;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.dto.cart.CartItemDto;
import lombok.Data;

import java.util.List;

@Data
public class CartDto implements BaseDto {

    List<CartItemDto> items;
    Long totalQuantity;
    Float totalCost;
    Float totalCostUsd;
    Float totalCostEur;

}
