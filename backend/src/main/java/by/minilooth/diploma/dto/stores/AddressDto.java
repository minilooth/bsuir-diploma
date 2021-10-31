package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@EqualsAndHashCode(callSuper = false)
public class AddressDto extends AbstractDto {

    private String street;
    private String house;
    private String housing;
    private String room;
    private String full;

}
