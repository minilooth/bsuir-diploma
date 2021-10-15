package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class RestorePasswordParamsDto implements BaseDto {

    private String email;

}
