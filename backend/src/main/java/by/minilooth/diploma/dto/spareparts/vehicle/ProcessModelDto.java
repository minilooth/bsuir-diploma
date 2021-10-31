package by.minilooth.diploma.dto.spareparts.vehicle;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class ProcessModelDto implements BaseDto {

    private MakeDto make;
    private String name;

}
