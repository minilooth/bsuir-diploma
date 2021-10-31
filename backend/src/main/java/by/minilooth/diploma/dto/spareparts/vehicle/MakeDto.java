package by.minilooth.diploma.dto.spareparts.vehicle;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class MakeDto extends AbstractDto {

    private String name;

}
