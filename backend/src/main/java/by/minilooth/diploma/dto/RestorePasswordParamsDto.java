package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class RestorePasswordParamsDto implements BaseDto {

    @NotNull(message = "{validation.user.field.email.null}")
    @NotBlank(message = "{validation.user.field.email.blank}")
    @Email(message = "{validation.user.field.email.invalid-format}")
    private String email;

}
