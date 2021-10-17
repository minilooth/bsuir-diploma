package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

@Data
public class ChangePasswordDto implements BaseDto {

    private String oldPassword;
    private String newPassword;
    private String confirmPassword;

}
