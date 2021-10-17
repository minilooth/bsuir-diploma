package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class ProcessUserDto implements BaseDto {

    private String username;
    private String email;
    private String firstname;
    private String middlename;
    private String lastname;
    private String phoneNumber;
    private RoleDto role;
    private ImageDto avatar;

}
