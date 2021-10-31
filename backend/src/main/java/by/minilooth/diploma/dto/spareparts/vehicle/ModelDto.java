package by.minilooth.diploma.dto.spareparts.vehicle;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ModelDto extends AbstractDto {

    private MakeDto make;
    private String name;

}
