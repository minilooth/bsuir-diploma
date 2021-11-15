package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class CharacteristicKeyDto implements BaseDto {

    private Long sparePartId;
    private Long modificationId;

}
