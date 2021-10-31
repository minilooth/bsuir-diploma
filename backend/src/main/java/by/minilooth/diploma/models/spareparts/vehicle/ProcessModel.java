package by.minilooth.diploma.models.spareparts.vehicle;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.vehicle.Make;
import lombok.Data;

@Data
public class ProcessModel implements BaseEntity {

    private Make make;
    private String name;

}
