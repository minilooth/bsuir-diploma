package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class LoginParamsDto implements BaseDto {

    @NotNull(message = "Имя пользователя не должно быть пустым")
    @NotBlank(message = "Имя пользователя не должно состоять из символов пробела")
    private String username;

    @NotNull(message = "Пароль не должен быть пустым")
    private String password;
    private Boolean rememberMe;

}
