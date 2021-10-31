package by.minilooth.diploma.dto.spareparts.characteristics;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ModificationDto extends AbstractDto {

    private String name;

}
