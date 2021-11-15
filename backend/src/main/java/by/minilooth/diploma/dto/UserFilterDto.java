package by.minilooth.diploma.dto;

import by.minilooth.diploma.common.api.AbstractFilter;
import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.common.enums.UserSort;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserFilterDto extends AbstractFilter<UserSort> implements BaseDto {

    private String fullname;
    private String email;
    private String phoneNumber;
    private Date registerDateFrom;
    private Date registerDateTo;

}
