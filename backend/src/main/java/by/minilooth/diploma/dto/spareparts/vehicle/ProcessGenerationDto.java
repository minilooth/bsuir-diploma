package by.minilooth.diploma.dto.spareparts.vehicle;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class ProcessGenerationDto implements BaseDto {

    private ModelDto model;
    private String name;

}
