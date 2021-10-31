package by.minilooth.diploma.models.spareparts.catalog;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.catalog.Category;
import lombok.Data;

@Data
public class ProcessSubcategory implements BaseEntity {

    private Category category;
    private String name;

}
