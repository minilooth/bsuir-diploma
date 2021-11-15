package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class LoginParamsDto implements BaseDto {

    @NotNull(message = "{validation.user.field.username.null}")
    @NotBlank(message = "{validation.user.field.username.blank}")
    private String username;

    @NotNull(message = "{validation.user.field.password.null}")
    @NotBlank(message = "{validation.user.field.password.blank}")
    private String password;

    private Boolean rememberMe;

}
