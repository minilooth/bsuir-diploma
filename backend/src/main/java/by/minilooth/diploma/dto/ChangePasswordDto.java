package by.minilooth.diploma.dto;

import by.minilooth.diploma.config.consts.RegexConsts;
import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class ChangePasswordDto implements BaseDto {

    private String oldPassword;

    @NotNull(message = "{validation.user.field.password.null}")
    @NotBlank(message = "{validation.user.field.password.blank}")
    @Pattern(regexp = RegexConsts.User.PASSWORD_REGEX, message = "{validation.user.field.password.invalid-format}")
    private String newPassword;

    @NotNull(message = "{validation.user.field.password.null}")
    @NotBlank(message = "{validation.user.field.password.blank}")
    @Pattern(regexp = RegexConsts.User.PASSWORD_REGEX, message = "{validation.user.field.password.invalid-format}")
    private String confirmPassword;

}
