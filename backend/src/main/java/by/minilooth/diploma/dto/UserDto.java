package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class UserDto extends AbstractDto {

    private String username;
    private String email;
    private String firstname;
    private String middlename;
    private String lastname;
    private String phoneNumber;
    private Boolean isEmailConfirmed;
    private Boolean isAccountNonLocked;
    private List<RoleDto> roles;
    private ImageDto avatar;

}
