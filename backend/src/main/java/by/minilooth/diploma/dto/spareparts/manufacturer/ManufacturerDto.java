package by.minilooth.diploma.dto.spareparts.manufacturer;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ManufacturerDto extends AbstractDto {

    private String name;

}
