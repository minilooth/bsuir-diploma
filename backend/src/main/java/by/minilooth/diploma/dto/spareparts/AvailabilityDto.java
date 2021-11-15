package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.dto.stores.StoreDto;
import by.minilooth.diploma.models.bean.keys.AvailabilityKey;
import lombok.Data;

@Data
public class AvailabilityDto implements BaseDto {

    private AvailabilityKeyDto id;
    private StoreDto store;
    private Integer quantity;

}
