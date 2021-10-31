package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.AbstractFilter;
import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.UserSort;
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
