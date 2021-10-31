package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import java.util.List;

@Data
public class UserListDto implements BaseDto {

    private List<UserDto> users;
    private Long pages;

}
