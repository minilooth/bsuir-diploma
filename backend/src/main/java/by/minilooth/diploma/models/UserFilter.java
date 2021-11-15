package by.minilooth.diploma.models;

import by.minilooth.diploma.common.api.AbstractFilter;
import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.common.enums.UserSort;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserFilter extends AbstractFilter<UserSort> implements BaseEntity {

    private String fullname;
    private String email;
    private String phoneNumber;
    private Date registerDateFrom;
    private Date registerDateTo;

}
