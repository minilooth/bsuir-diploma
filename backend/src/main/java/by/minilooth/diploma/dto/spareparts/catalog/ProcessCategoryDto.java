package by.minilooth.diploma.dto.spareparts.catalog;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ProcessCategoryDto implements BaseDto {

    private String name;

}
