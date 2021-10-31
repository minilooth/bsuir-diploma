package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.dto.ImageDto;
import by.minilooth.diploma.dto.api.AbstractDto;
import by.minilooth.diploma.models.enums.StoreType;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class StoreDto extends AbstractDto {

    private String name;
    private StoreType type;
    private AddressDto address;
    private ImageDto image;

}
