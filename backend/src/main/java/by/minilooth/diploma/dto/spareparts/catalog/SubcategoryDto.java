package by.minilooth.diploma.dto.spareparts.catalog;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class SubcategoryDto extends AbstractDto {

    private String name;
    private CategoryDto category;

}
