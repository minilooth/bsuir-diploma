package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.models.bean.UserSort;
import by.minilooth.diploma.models.enums.SortDirection;
import lombok.Data;

import java.util.Date;

@Data
public class UserFilterDto implements BaseDto {

    private UserSort sort;
    private SortDirection sortDirection;
    private String fullname;
    private String email;
    private String phoneNumber;
    private Date registerDateFrom;
    private Date registerDateTo;
    private String search;
    private Integer page;

}
