package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.BaseEntity;
import lombok.Data;

@Data
public class RestorePasswordParams implements BaseEntity {

    private String email;

}
