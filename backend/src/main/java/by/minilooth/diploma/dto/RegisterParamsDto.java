package by.minilooth.diploma.dto;

import by.minilooth.diploma.config.consts.RegexConsts;
import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class RegisterParamsDto implements BaseDto {

    @NotNull(message = "{validation.user.field.username.null}")
    @NotBlank(message = "{validation.user.field.username.blank}")
    @Pattern(regexp = RegexConsts.User.USERNAME_REGEX, message = "{validation.user.field.username.invalid-format}")
    private String username;

    @NotNull(message = "{validation.user.field.email.null}")
    @NotBlank(message = "{validation.user.field.email.blank}")
    @Email(message = "{validation.user.field.email.invalid-format}")
    private String email;

    @NotNull(message = "{validation.user.field.phone-number.null}")
    @NotBlank(message = "{validation.user.field.phone-number.blank}")
    @Pattern(regexp = RegexConsts.User.PHONE_NUMBER_REGEX, message = "{validation.user.field.phone-number.invalid-format}")
    private String phoneNumber;

}
