package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.dto.spareparts.characteristics.ModificationDto;
import lombok.Data;

@Data
public class CharacteristicDto implements BaseDto {

    private CharacteristicKeyDto id;
    private ModificationDto modification;
    private String value;

}
