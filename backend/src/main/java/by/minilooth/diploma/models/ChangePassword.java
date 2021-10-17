package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.BaseEntity;
import lombok.Data;

@Data
public class ChangePassword implements BaseEntity {

    private String oldPassword;
    private String newPassword;
    private String confirmPassword;

}
