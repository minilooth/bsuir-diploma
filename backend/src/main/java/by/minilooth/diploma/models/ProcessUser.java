package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.models.bean.users.Role;
import lombok.Data;

@Data
public class ProcessUser implements BaseEntity {

    private String username;
    private String email;
    private String firstname;
    private String middlename;
    private String lastname;
    private String phoneNumber;
    private Role role;
    private Image avatar;

}
