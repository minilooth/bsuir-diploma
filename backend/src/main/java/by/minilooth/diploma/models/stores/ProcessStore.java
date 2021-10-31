package by.minilooth.diploma.models.stores;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.models.enums.StoreType;
import lombok.Data;

@Data
public class ProcessStore implements BaseEntity {

    private Image image;
    private String name;
    private StoreType type;
    private Address address;

}
