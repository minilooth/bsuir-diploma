package by.minilooth.diploma.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StoreType {

    STORAGE("Склад"),
    SHOP("Магазин");

    private final String name;

}
