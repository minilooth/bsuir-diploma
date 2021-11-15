package by.minilooth.diploma.common.api;

import by.minilooth.diploma.common.enums.SortDirection;
import lombok.Data;

@Data
public abstract class AbstractFilter<T> {

    private T sort;
    private SortDirection sortDirection;
    private String search;
    private Integer page;

}
