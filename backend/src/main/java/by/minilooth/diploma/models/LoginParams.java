package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.BaseEntity;
import lombok.Data;

@Data
public class LoginParams implements BaseEntity {

    private String username;
    private String password;

}
