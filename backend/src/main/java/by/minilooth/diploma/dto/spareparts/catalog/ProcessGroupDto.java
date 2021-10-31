package by.minilooth.diploma.dto.spareparts.catalog;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class ProcessGroupDto implements BaseDto {

    private SubcategoryDto subcategory;
    private String name;

}
