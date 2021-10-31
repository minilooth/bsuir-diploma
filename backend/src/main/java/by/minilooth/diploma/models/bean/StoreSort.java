package by.minilooth.diploma.models.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum StoreSort {

    ADDRESS("address"),
    NAME("name"),
    STORE_TYPE("type");

    private final String field;

}
