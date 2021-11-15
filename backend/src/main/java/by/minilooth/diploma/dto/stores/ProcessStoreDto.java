package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.config.consts.RegexConsts;
import by.minilooth.diploma.dto.ImageDto;
import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.common.enums.StoreType;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class ProcessStoreDto implements BaseDto {

    private ImageDto image;

    @NotNull(message = "{validation.store.field.name.null}")
    @NotBlank(message = "{validation.store.field.name.blank}")
    @Pattern(regexp = RegexConsts.Store.NAME_REGEX, message = "{validation.store.field.name.invalid-format}")
    private String name;

    @NotNull(message = "{validation.store.field.type.null}")
    private StoreType type;

    @NotNull(message = "{validation.store.field.address.null}")
    private AddressDto address;

}
