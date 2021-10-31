package by.minilooth.diploma.models.api;

import by.minilooth.diploma.models.enums.SortDirection;
import lombok.Data;

@Data
public abstract class AbstractFilter<T> {

    private T sort;
    private SortDirection sortDirection;
    private String search;
    private Integer page;

}
