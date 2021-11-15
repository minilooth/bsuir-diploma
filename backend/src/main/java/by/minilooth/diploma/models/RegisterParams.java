package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.BaseEntity;
import lombok.Data;

@Data
public class RegisterParams implements BaseEntity {

    private String username;
    private String email;
    private String phoneNumber;

}
