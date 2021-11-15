package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class AvailabilityKeyDto implements BaseDto {

    private Long storeId;
    private Long sparePartId;

}
