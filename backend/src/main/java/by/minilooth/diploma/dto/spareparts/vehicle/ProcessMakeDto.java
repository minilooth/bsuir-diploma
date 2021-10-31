package by.minilooth.diploma.dto.spareparts.vehicle;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ProcessMakeDto implements BaseDto {

    private String name;

}
