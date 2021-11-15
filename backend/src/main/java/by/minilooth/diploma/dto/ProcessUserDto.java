package by.minilooth.diploma.dto;

import by.minilooth.diploma.config.consts.RegexConsts;
import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class ProcessUserDto implements BaseDto {

    @NotNull(message = "{validation.user.field.username.null}")
    @NotBlank(message = "{validation.user.field.username.blank}")
    @Pattern(regexp = RegexConsts.User.USERNAME_REGEX, message = "{validation.user.field.username.invalid-format}")
    private String username;

    @NotNull(message = "{validation.user.field.email.null}")
    @NotBlank(message = "{validation.user.field.email.blank}")
    @Email(message = "{validation.user.field.email.invalid-format}")
    private String email;

    @NotNull(message = "{validation.user.field.firstname.null}")
    @NotBlank(message = "{validation.user.field.firstname.blank}")
    @Pattern(regexp = RegexConsts.User.FIRSTNAME_REGEX, message = "{validation.user.field.firstname.invalid-format}")
    private String firstname;

    @NotNull(message = "{validation.user.field.middlename.null}")
    @NotBlank(message = "{validation.user.field.middlename.blank}")
    @Pattern(regexp = RegexConsts.User.MIDDLENAME_REGEX, message = "{validation.user.field.middlename.invalid-format}")
    private String middlename;

    @NotNull(message = "{validation.user.field.lastname.null}")
    @NotBlank(message = "{validation.user.field.lastname.blank}")
    @Pattern(regexp = RegexConsts.User.LASTNAME_REGEX, message = "{validation.user.field.lastname.blank}")
    private String lastname;

    @NotNull(message = "{validation.user.field.phone-number.null}")
    @NotBlank(message = "{validation.user.field.phone-number.blank}")
    @Pattern(regexp = RegexConsts.User.PHONE_NUMBER_REGEX, message = "{validation.user.field.phone-number.invalid-format}")
    private String phoneNumber;

    @NotNull(message = "{validation.user.field.role.null}")
    private RoleDto role;

    private ImageDto avatar;

}
