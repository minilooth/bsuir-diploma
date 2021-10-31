package by.minilooth.diploma.models.spareparts.catalog;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import lombok.Data;

@Data
public class ProcessGroup implements BaseEntity {

    private Subcategory subcategory;
    private String name;

}
