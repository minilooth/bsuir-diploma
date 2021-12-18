package by.minilooth.diploma.dto;

import by.minilooth.diploma.config.consts.RegexConsts;
import by.minilooth.diploma.dto.api.AbstractDto;
import by.minilooth.diploma.dto.cart.CartDto;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class UserDto extends AbstractDto {

    public interface New {}
    public interface Register {}
    public interface Profile {}

    @NotNull(message = "{validation.user.field.username.null}", groups = {New.class, Register.class})
    @NotBlank(message = "{validation.user.field.username.blank}", groups = {New.class, Register.class})
    @Pattern(regexp = RegexConsts.User.USERNAME_REGEX, message = "{validation.user.field.username.invalid-format}", groups = {New.class, Register.class})
    private String username;

    @NotNull(message = "{validation.user.field.email.null}", groups = {New.class, Register.class})
    @NotBlank(message = "{validation.user.field.email.blank}", groups = {New.class, Register.class})
    @Email(message = "{validation.user.field.email.invalid-format}", groups = {New.class, Register.class})
    private String email;

    @NotNull(message = "{validation.user.field.firstname.null}", groups = {New.class, Register.class, Profile.class})
    @NotBlank(message = "{validation.user.field.firstname.blank}", groups = {New.class, Register.class, Profile.class})
    @Pattern(regexp = RegexConsts.User.FIRSTNAME_REGEX, message = "{validation.user.field.firstname.invalid-format}", groups = {New.class, Register.class, Profile.class})
    private String firstname;

    @NotNull(message = "{validation.user.field.middlename.null}", groups = {New.class, Register.class, Profile.class})
    @NotBlank(message = "{validation.user.field.middlename.blank}", groups = {New.class, Register.class, Profile.class})
    @Pattern(regexp = RegexConsts.User.MIDDLENAME_REGEX, message = "{validation.user.field.middlename.invalid-format}", groups = {New.class, Register.class, Profile.class})
    private String middlename;

    @NotNull(message = "{validation.user.field.lastname.null}", groups = {New.class, Register.class, Profile.class})
    @NotBlank(message = "{validation.user.field.lastname.blank}", groups = {New.class, Register.class, Profile.class})
    @Pattern(regexp = RegexConsts.User.LASTNAME_REGEX, message = "{validation.user.field.lastname.blank}", groups = {New.class, Register.class, Profile.class})
    private String lastname;

    @NotNull(message = "{validation.user.field.phone-number.null}", groups = {New.class, Register.class, Profile.class})
    @NotBlank(message = "{validation.user.field.phone-number.blank}", groups = {New.class, Register.class, Profile.class})
    @Pattern(regexp = RegexConsts.User.PHONE_NUMBER_REGEX, message = "{validation.user.field.phone-number.invalid-format}", groups = {New.class, Register.class, Profile.class})
    private String phoneNumber;

    private Boolean isEmailConfirmed;
    private Boolean isAccountNonLocked;
    private Boolean isAccountNonDisabled;

    @NotNull(message = "{validation.user.field.role.null}", groups = {New.class})
    private List<RoleDto> roles;

    private ImageDto avatar;
    private CartDto cart;

}
