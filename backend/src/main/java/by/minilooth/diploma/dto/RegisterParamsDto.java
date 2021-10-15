package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class RegisterParamsDto implements BaseDto {

    @NotNull(message = "Имя пользователя не должно быть пустым")
    @NotBlank(message = "Имя пользователя не должно состоять из символов пробела")
    @Pattern(regexp = "^[A-Za-z0-9_]+$", message = "Имя пользователя указано в некорректном формате")
    private String username;

    @NotNull(message = "E-mail не должен быть пустым")
    @NotBlank(message = "E-mail не должен состоять из символов пробела")
    @Email(message = "E-mail указан в некорректном формате")
    private String email;

}
