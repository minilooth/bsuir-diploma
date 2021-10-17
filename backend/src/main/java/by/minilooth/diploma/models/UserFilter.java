package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.UserSort;
import by.minilooth.diploma.models.enums.SortDirection;
import lombok.Data;

import java.util.Date;

@Data
public class UserFilter implements BaseEntity {

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
