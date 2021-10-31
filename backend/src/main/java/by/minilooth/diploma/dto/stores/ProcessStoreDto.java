package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.dto.ImageDto;
import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.models.enums.StoreType;
import lombok.Data;

@Data
public class ProcessStoreDto implements BaseDto {

    private ImageDto image;
    private String name;
    private StoreType type;
    private AddressDto address;

}
