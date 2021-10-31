package by.minilooth.diploma.dto.spareparts.catalog;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class ProcessSubcategoryDto implements BaseDto {

    private CategoryDto category;
    private String name;

}
