package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ProcessAddressDto implements BaseDto {

    @NotNull(message = "{validation.address.field.street.null}")
    @NotBlank(message = "{validation.address.field.street.blank}")
    private String street;

    @NotBlank(message = "{validation.address.field.house.blank}")
    private String house;

    @NotBlank(message = "{validation.address.field.housing.blank}")
    private String housing;

    @NotNull(message = "{validation.address.field.room.null}")
    @NotBlank(message = "{validation.address.field.room.blank}")
    private String room;

}
