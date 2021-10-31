package by.minilooth.diploma.models.stores;

import by.minilooth.diploma.models.api.BaseEntity;
import lombok.Data;

@Data
public class ProcessAddress implements BaseEntity {

    private String street;
    private String house;
    private String housing;
    private String room;

}
