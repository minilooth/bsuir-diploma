package by.minilooth.diploma.models.spareparts.vehicle;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.vehicle.Model;
import lombok.Data;

@Data
public class ProcessGeneration implements BaseEntity {

    private Model model;
    private String name;

}
