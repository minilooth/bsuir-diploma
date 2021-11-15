package by.minilooth.diploma.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum SparePartSort {

    NAME("name"),
    MANUFACTURER("manufacturer"),
    ARTICLE("article"),
    DESCRIPTION("description"),
    PURCHASE_PRICE("purchasePrice"),
    RETAIL_PRICE("retailPrice"),
    MAKE("make"),
    MODEL("model"),
    GENERATION("generation"),
    CATEGORY("category"),
    SUBCATEGORY("subcategory"),
    GROUP("group");

    private final String field;

}
